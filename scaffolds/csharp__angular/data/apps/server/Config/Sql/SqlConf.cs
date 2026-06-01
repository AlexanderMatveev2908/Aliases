using UserAccountsApi.LibNS;

namespace UserAccountsApi.ConfigNS.SqlNS;

public static class SqlDb
{
  // ? not need due use of ctx
  public static async Task Connect()
  {
    string host = EnvVarsLib.Get("DB_HOST");
    string port = EnvVarsLib.Get("DB_PORT");
    string database = EnvVarsLib.Get("DB_DATABASE");
    string user = EnvVarsLib.Get("DB_USER");
    string pwd = EnvVarsLib.Get("DB_PWD");

    var connectionString =
        $"Host={host};Port={port};Database={database};Username={user};Password={pwd};SSL Mode=Require;Trust Server Certificate=true";
    await using var connection = new Npgsql.NpgsqlConnection(connectionString);


    try
    {
      await connection.OpenAsync();
      Console.WriteLine("💾 Connected to the database 💾");
    }
    catch (Exception ex)
    {
      Console.WriteLine($"Failed to connect to the database: {ex.Message}");
    }
  }
}