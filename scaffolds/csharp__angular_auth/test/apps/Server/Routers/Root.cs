using Server.FeaturesNS.AuthNS;
using Server.FeaturesNS.CloudNS;
using Server.FeaturesNS.UserNS;
using Server.FeaturesNS.WakeUpNS;

namespace Server.RoutersNS.RootNS;

public static class RootRouter
{
  public static void MapApi(WebApplication app)
  {
    RouteGroupBuilder api = app.MapGroup("/api/v1");
    api.DisableAntiforgery();

    CloudRouter.MapApi(api);
    WakeUpRouter.MapAPi(api);
    AuthRouter.MapApi(api);
    UserRouter.MapAPi(api);
  }
}