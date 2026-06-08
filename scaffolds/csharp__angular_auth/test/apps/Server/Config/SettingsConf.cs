using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.ConfigNS.SqlNS;
using Server.LibNS.EnvNS;
using Microsoft.Extensions.Hosting;
using Server.RoutersNS.RootNS;

namespace Server.ConfigNS.SettingsNS;


public static class SettingsConf
{
  private static async Task CheckDb(WebApplication app)
  {
    try
    {
      using var scope = app.Services.CreateScope();
      SqlDbCtx db = scope.ServiceProvider.GetRequiredService<SqlDbCtx>();

      bool canConnect = await db.Database.CanConnectAsync();

      Console.WriteLine(
           canConnect
               ? "💾 Database connected 💾"
               : "❌ Database failed ❌"
       );
    }
    catch (Exception err)
    {
      Console.WriteLine(err.Message);
    }
  }

  public static void ConfigureBuilder(WebApplicationBuilder builder)
  {
    builder.Services.AddOpenApi();

    builder.Services.ConfigureHttpJsonOptions(options =>
{
  options.SerializerOptions.PropertyNamingPolicy =
      JsonNamingPolicy.CamelCase;
});


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
    // app.UseHttpsRedirection();

    RootRouter.MapApi(app);

    app.Lifetime.ApplicationStarted.Register(() =>
  {
    foreach (string url in app.Urls)
    {
      Console.WriteLine($"🚀 Listening on: {url} 🚀");
    }
  });
  }
}