using UserAccountsApi.ExtensionsNS.RateLimitNS;
using UserAccountsApi.LibNS;

namespace UserAccountsApi.RoutesNS;

public static class TestRouter
{

  public static void MapAPi(RouteGroupBuilder api)
  {
    api.MapGet("test", () =>
    {
      return Res.Json(200, "Hello world");
    }).WithRateLimit(
        TimeSpan.FromMinutes(5),
        5
    );
  }
}