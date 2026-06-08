using Server.LibNS;

namespace Server.FeaturesNS.WakeUpNS;

public static class WakeUpCtrl
{
  public static IResult WakeUp()
  {
    // await Task.Delay(5000);

    return Res.Json(200, "Ops I di not listen the alarm");
  }
}