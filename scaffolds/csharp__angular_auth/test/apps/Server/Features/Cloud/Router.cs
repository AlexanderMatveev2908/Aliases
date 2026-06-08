namespace Server.FeaturesNS.CloudNS;

public static class CloudRouter
{
  public static void MapApi(RouteGroupBuilder api)
  {
    api.MapPost("/cloud", CloudCtrl.PostFile);
    api.MapDelete("/cloud", CloudCtrl.DeleteFile);
  }
}