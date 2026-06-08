using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.ConfigNS.SqlNS;
using Server.LibNS;
using Server.ModelsNS.UserNS;
using Microsoft.EntityFrameworkCore;
using Server.LibNS.EnvNS;

namespace Server.FilterNS.JwtND;

public class JwtFilter : IEndpointFilter
{
  public async ValueTask<object?> InvokeAsync(
   EndpointFilterInvocationContext ctx,
   EndpointFilterDelegate next
)
  {
    HttpContext http = ctx.HttpContext;
    string? auth =
        http.Request.Headers.Authorization.FirstOrDefault();

    if (string.IsNullOrWhiteSpace(auth))
      return Res.Json(401, "JWT_NOT_PROVIDED");

    if (!auth.StartsWith("Bearer "))
      return Res.Json(401, "JWT_INVALID");

    string token = auth["Bearer ".Length..];

    try
    {
      var claims = GetCLaims(token);

      string? userId = claims.FindFirst("id")?.Value;

      if (string.IsNullOrWhiteSpace(userId))
        return Res.Json(401, "JWT_INVALID");

      SqlDbCtx db =
          http.RequestServices.GetRequiredService<SqlDbCtx>();
      User? dbUser = await db.User.FirstOrDefaultAsync(u => u.Id.ToString() == userId);

      if (dbUser is null)
        return Res.Json(401, "user not found");

      http.Items["claims"] = claims;
      http.Items["user"] = dbUser;

      return await next(ctx);
    }
    catch (SecurityTokenExpiredException)
    {
      return Res.Json(401, "JWT_EXPIRED");
    }
    catch
    {
      return Res.Json(401, "JWT_INVALID");
    }

  }

  private static ClaimsPrincipal GetCLaims(string token)
  {
    JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
    JwtSecurityTokenHandler handler = new();
    byte[] key =
              Encoding.UTF8.GetBytes(EnvVarsLib.Get("JWT_SECRET"));

    ClaimsPrincipal claims = handler.ValidateToken(
        token,
        new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false,
          ValidateLifetime = true,
          ClockSkew = TimeSpan.Zero
        },
        out SecurityToken validatedToken
    );

    return claims;
  }
}