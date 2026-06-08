using Server.TypesNS.UserNS;
using Server.ExtensionsNS.RootNS;
using Server.FilterNS.JwtND;
using Server.ExtensionsNS.JwtNS;
using Server.TypesNS.AuthNS;
using Server.ExtensionsNS.RateLimitNS;
namespace Server.FeaturesNS.AuthNS;

public static class AuthRouter
{
  public static void MapApi(RouteGroupBuilder api)
  {
    api.MapPost("/auth/register", AuthPostCtrl.Register).WithRateLimit(TimeSpan.FromHours(1), 5).WithBodyChecked<RegisterDto>();

    api.MapPost("/auth/login", AuthPostCtrl.Login).WithRateLimit(TimeSpan.FromHours(1), 5).WithBodyChecked<LoginDto>();

    api.MapPost("/auth/logout", AuthPostCtrl.Logout).WithJwtCheck();

    api.MapGet("/auth/protected", (Delegate)AuthGetCtrl.GetProtected).WithJwtCheck();

    api.MapPost("/auth/refresh", AuthPostCtrl.RefreshToken);

    api.MapGet("/auth/test-limiter", AuthGetCtrl.TestLimiter).WithRateLimit(TimeSpan.FromDays(1), 5);
  }
}