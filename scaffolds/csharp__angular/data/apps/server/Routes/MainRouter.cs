using UserAccountsApi.RoutesNS.UserNS;
using UserAccountsApi.RoutesNS.WakeUpNS;

namespace UserAccountsApi.RoutesNS;

public static class MainRouter
{
  public static void MapAPi(WebApplication app)
  {
    RouteGroupBuilder api = app.MapGroup("/api/v1");
    api.DisableAntiforgery();

    TestRouter.MapAPi(api);
    CloudRouter.MapAPi(api);
    UsersRouter.MapApi(api);
    WakeUpRouter.MapApi(api);
  }
}