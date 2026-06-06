using InvoicesApp.LibNS;

namespace Server.FeaturesNS.WakeUpNS;

public static class WakeUpCtrl
{
  public static async Task<IResult> WakeUp()
  {
    await Task.Delay(5000);

    return Res.Json(200, "Ops I di not listen the alarm");
  }
}