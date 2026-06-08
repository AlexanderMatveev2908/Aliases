using Server.ExtensionsNS.JwtNS;

namespace Server.FeaturesNS.UserNS;

public static class UserRouter
{
  public static void MapAPi(RouteGroupBuilder api)
  {
    api.MapGet("/user", UserGetCtrl.GetUser).WithJwtCheck();
  }
}