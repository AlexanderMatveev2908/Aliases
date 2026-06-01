using UserAccountsApi.ControllersNS.CloudNS;

namespace UserAccountsApi.RoutesNS;

public static class CloudRouter
{
  public static void MapAPi(RouteGroupBuilder api)
  {
    api.MapPost("/cloud", CloudCtrl.PostFile);
    api.MapDelete("/cloud", CloudCtrl.DeleteFile);
  }
}