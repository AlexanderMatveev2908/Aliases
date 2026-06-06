using InvoicesApp.LibNS;
using InvoicesApp.LibNS.ShapeNS;
using InvoicesApp.ModelsNS.UsersNS;
using InvoicesApp.TypesNS.UsersNS;
using Server.ConfigNS.SqlNS;

namespace Server.FeaturesNS.UsersNS;

public static class UsersCtrl
{
  public static async Task<IResult> PostUser(HttpContext ctx, SqlDbCtx db)
  {
    UsersDto dto = (UsersDto)ctx.Items["dto"]!;

    await using var trx = await db.Database.BeginTransactionAsync();

    try
    {
      Users newUser = new()
      {
        FirstName = dto.FirstName,
        LastName = dto.LastName,
        Email = dto.Email,
        Password = dto.Password
      };

      await db.SaveChangesAsync
     ();
      await trx.CommitAsync();

      return Res.Json(201, "Invoice created", new
      {
        Invoice = LibShape.Merge(dto, new
        {
          id = newUser.Id
        })
      });
    }
    catch
    {
      await trx.RollbackAsync();
      return Res.Json(500, "Internal Server Error");
    }
  }

  public static async Task<IResult> DeleteUser(
      SqlDbCtx db,
      int userId
  )
  {
    Users? user =
        await db.Users.FindAsync(userId);

    if (user is null)
      return Res.Json(404, "User not found");


    db.Users.Remove(user);

    int deletedCount =
        await db.SaveChangesAsync();


    return Res.Json(200, "User deleted", new
    {
      deletedCount
    });
  }
}