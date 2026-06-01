using UserAccountsApi.LibNS;
using UserAccountsApi.RoutesNS;
using UserAccountsApi.MiddlewareNS;
using UserAccountsApi.ConfigNS.SqlNS;
using Npgsql;
using Microsoft.EntityFrameworkCore;

namespace UserAccountsApi.ConfigNS;

public static class SettingsConf
{

  public static async Task CheckDb(WebApplication app)
  {
    try
    {
      using var scope =
          app.Services.CreateScope();

      SqlDbCtx db =
          scope.ServiceProvider
              .GetRequiredService<SqlDbCtx>();

      bool canConnect =
          await db.Database.CanConnectAsync();

      Console.WriteLine(
          canConnect
              ? "💾 Database connected 💾"
              : "❌ Database failed ❌"
      );
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
    }
  }


  public static void ConfigureBuilder(WebApplicationBuilder builder)
  {
    builder.Services.AddOpenApi();

    builder.Services.AddCors(options =>
    {
      options.AddPolicy(
      "Frontend",
      policy =>
      {
        policy
        .WithOrigins(
            EnvVarsLib.Get("FRONTEND_URL"),
            EnvVarsLib.Get("FRONTEND_URL_DEV")
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
      }
  );
    });

    builder.WebHost.ConfigureKestrel(options =>
   {
     options.Limits.MaxRequestBodySize =
     1024 * 1024 * 500;
   });

    builder.Services.AddNpgsqlDataSource(
     EnvVarsLib.Get("DB_URL")
 );

    builder.Services.AddDbContext<SqlDbCtx>(options =>
{
  options.UseNpgsql(EnvVarsLib.Get("DB_URL"));
});
  }

  public static async Task ConfigureApp(WebApplication app)
  {
    await CheckDb(app);

    if (app.Environment.IsDevelopment())
      app.MapOpenApi();

    app.UseCors("Frontend");
    app.UseHttpsRedirection();
    MainMdw.UseMainMdw(app);

    MainRouter.MapAPi(app);
  }
}