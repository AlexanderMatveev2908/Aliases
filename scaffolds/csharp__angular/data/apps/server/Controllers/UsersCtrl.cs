using Dapper;
using Npgsql;
using Microsoft.EntityFrameworkCore;
using UserAccountsApi.ConfigNS.SqlNS;
using UserAccountsApi.ModelsNS;
using UserAccountsApi.TypesNS;
using Superpower.Model;
using UserAccountsApi.ServicesNS.SqlTrxNS;
using UserAccountsApi.LibNS;

namespace UserAccountsApi.ControllersNS.UsersNS;

public static class UsersCtrl
{
  public static async Task<IResult> PostUser(HttpContext ctx, SqlDbCtx db)
  {

    if (ctx.Items["user"] is not UsersDto user)
      return Res.Json(500, "User not found in context");

    Users createdUser = null!;

    return await SqlTrxSvc.InTrx(db, async (NpgsqlConnection conn, NpgsqlTransaction trx) =>
      {
        createdUser = await conn.QuerySingleAsync<Users>(
          """
            INSERT INTO "Users" ("FirstName", "LastName", "Email", "Password")
            VALUES (@FirstName, @LastName, @Email, @Password )
            RETURNING *;
            """,
          new
          {
            user.FirstName,
            user.LastName,
            user.Email,
            user.Password,
          },
          trx
      );

        return Res.Json(201, "User created", new
        {
          createdUser
        });
      });
  }




  public static async Task<IResult> DeleteUser(
      SqlDbCtx db,
      int userId
  )
  {
    Users? user =
        await db.Users.FindAsync(userId);

    Console.WriteLine(user);

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