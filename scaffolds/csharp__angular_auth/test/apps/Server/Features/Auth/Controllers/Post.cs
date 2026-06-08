using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Server.ConfigNS.SqlNS;
using Server.LibNS;
using Server.LibNS.ShapeNS;
using Server.LibNS.TokensNS;
using Server.ModelsNS.RefreshTokensNS;
using Server.ModelsNS.UserNS;
using Server.TypesNS.AuthNS;
using Server.TypesNS.UserNS;

namespace Server.FeaturesNS.AuthNS;

public static class AuthPostCtrl
{
  public static async Task<IResult> Register(HttpContext ctx, SqlDbCtx db)
  {
    RegisterDto dto = (RegisterDto)ctx.Items["dto"]!;

    User? existing = await db.User.FirstOrDefaultAsync(
      us => us.Email == dto.Email
    );

    if (existing is not null)
      return Res.Json(404, "User already exists");

    await using var trx = await db.Database.BeginTransactionAsync();

    try
    {
      User newUser = new(dto);
      newUser.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);

      db.User.Add(newUser);
      await db.SaveChangesAsync();

      var (
      refreshToken,
      dbRefreshToken,
      accessToken
  ) = genPairTokens(newUser);

      db.RefreshToken.Add(dbRefreshToken);
      await db.SaveChangesAsync();

      ApplyRefreshCookie(ctx, refreshToken);

      await trx.CommitAsync();

      Dictionary<string, object?> userDict = LibShape.Merge(newUser, new { id = newUser.Id });
      var userWithoutPwd = LibShape.RemoveKeys(userDict, "password");

      return Res.Json(201, "user registered", new
      {
        newUser = userWithoutPwd,
        accessToken
      });
    }
    catch
    {
      await trx.RollbackAsync();
      return Res.Json(500, "Register failed");
    }
  }


  public static async Task<IResult> RefreshToken(HttpContext ctx, SqlDbCtx db)
  {
    string? refreshToken =
    ctx.Request.Cookies["refreshToken"];

    if (string.IsNullOrWhiteSpace(refreshToken))
      return Res.Json(401, "REFRESH_TOKEN_MISSING");

    string tokenHash =
    RefreshTokensLib.Hash(refreshToken);

    RefreshToken? dbToken =
         await db.RefreshToken
             .FirstOrDefaultAsync(t => t.TokenHash == tokenHash);

    if (dbToken is null)
      return Res.Json(401, "REFRESH_TOKEN_INVALID");


    if (dbToken.ExpiresAt < DateTime.UtcNow)
      return Res.Json(401, "REFRESH_TOKEN_EXPIRED");


    User? user =
         await db.User.FirstOrDefaultAsync(u => u.Id == dbToken.UserId);

    if (user is null)
      return Res.Json(401, "user not found");

    string accessToken =
        JwtLib.Create(user);

    return Res.Json(200, "token refreshed", new
    {
      accessToken
    });
  }

  public static async Task<IResult> Login(SqlDbCtx db, HttpContext ctx)
  {
    LoginDto dto = (LoginDto)ctx.Items["dto"]!;

    User? existingUser = await db.User.FirstOrDefaultAsync(u => u.Email == dto.Email);
    if (existingUser is null)
      return Res.Json(404, "user not found");

    bool passwordOk =
           BCrypt.Net.BCrypt.Verify(dto.Password, existingUser.Password);

    if (!passwordOk)
      return Res.Json(401, "invalid credentials");

    var (
    refreshToken,
    dbRefreshToken,
    accessToken
) = genPairTokens(existingUser);

    ApplyRefreshCookie(ctx, refreshToken);

    db.RefreshToken.Add(dbRefreshToken);
    await db.SaveChangesAsync();

    return Res.Json(200, "logged successfully", new
    {
      accessToken
    });
  }

  private static (string refreshToken, RefreshToken dbRefreshToken, string accessToken) genPairTokens(User us)
  {
    string refreshToken = RefreshTokensLib.Create();

    RefreshToken dbRefreshToken = new()
    {
      UserId = us.Id,
      TokenHash = RefreshTokensLib.Hash(refreshToken),
      // ! to set higher in prod 
      ExpiresAt = DateTime.UtcNow.AddMinutes(60)
    };

    string accessToken = JwtLib.Create(us);


    return (
      refreshToken,
      dbRefreshToken,
      accessToken
    );
  }


  private static void ApplyRefreshCookie(HttpContext ctx, string refreshToken)
  {
    ctx.Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
    {
      HttpOnly = true,
      Secure = true,
      SameSite = SameSiteMode.None,
      // ! to set higher in prod 
      Expires = DateTimeOffset.UtcNow.AddMinutes(70)
    });

  }


  public static async Task<IResult> Logout(HttpContext ctx, SqlDbCtx db)
  {
    User user =
   (User)ctx.Items["user"]!;


    int userId = user.Id;

    string? refreshToken =
     ctx.Request.Cookies["refreshToken"];

    if (!string.IsNullOrWhiteSpace(refreshToken))
    {
      string tokenHash =
          RefreshTokensLib.Hash(refreshToken);

      RefreshToken? dbToken =
          await db.RefreshToken.FirstOrDefaultAsync(t =>
              t.UserId == userId &&
              t.TokenHash == tokenHash
          );

      if (dbToken is not null)
      {
        db.RefreshToken.Remove(dbToken);
        await db.SaveChangesAsync();
      }
    }

    ctx.Response.Cookies.Delete("refreshToken", new CookieOptions
    {
      HttpOnly = true,
      Secure = true,
      SameSite = SameSiteMode.None
    });

    return Res.Json(200, "logout successful");
  }
}