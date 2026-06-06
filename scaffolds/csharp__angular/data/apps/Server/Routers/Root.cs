using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Server.FeaturesNS.CloudNS;
using Server.FeaturesNS.UsersNS;
using Server.FeaturesNS.WakeUpNS;

namespace Server.RoutersNS.RootNS;

public static class RootRouter
{
  public static void MapApi(WebApplication app)
  {
    RouteGroupBuilder api = app.MapGroup("/api/v1");
    api.DisableAntiforgery();

    CloudRouter.MapApi(api);
    UsersRouter.MapApi(api);
    WakeUpRouter.MapAPi(api);
  }
}