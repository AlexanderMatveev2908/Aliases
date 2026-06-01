using Npgsql;
using UserAccountsApi.ConfigNS.SqlNS;
using Microsoft.EntityFrameworkCore;

namespace UserAccountsApi.ServicesNS.SqlTrxNS;


public static class SqlTrxSvc
{
  public static async Task<T> InTrx<T>(
      SqlDbCtx db,
      Func<NpgsqlConnection, NpgsqlTransaction, Task<T>> action
  )
  {
    NpgsqlConnection conn =
        (NpgsqlConnection)db.Database.GetDbConnection();

    await conn.OpenAsync();

    await using NpgsqlTransaction trx =
        await conn.BeginTransactionAsync();

    try
    {
      T result = await action(conn, trx);
      await trx.CommitAsync();
      return result;
    }
    catch
    {
      await trx.RollbackAsync();
      throw;
    }
  }
}