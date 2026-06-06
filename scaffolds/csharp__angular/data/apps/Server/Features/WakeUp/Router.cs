namespace Server.FeaturesNS.WakeUpNS;

public static class WakeUpRouter
{
  public static void MapAPi(RouteGroupBuilder api)
  {
    api.MapGet("/wake-up", WakeUpCtrl.WakeUp);
  }
}