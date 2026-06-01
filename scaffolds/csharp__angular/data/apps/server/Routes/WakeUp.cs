using UserAccountsApi.ControllersNS.WakeUpNS;

namespace UserAccountsApi.RoutesNS.WakeUpNS;

public static class WakeUpRouter
{
  public static void MapApi(RouteGroupBuilder api)
  {
    api.MapGet("/wake-up", WakeUpCtrl.WakeUp);
  }
}