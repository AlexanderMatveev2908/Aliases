using InvoicesApp.TypesNS.UsersNS;
using Server.ExtensionsNS.RootNS;

namespace Server.FeaturesNS.UsersNS;

public static class UsersRouter
{
  public static void MapApi(RouteGroupBuilder api)
  {
    api.MapPost("/users", UsersCtrl.PostUser).WithBodyChecked<UsersDto>();
    api.MapDelete("/users/{userId}", UsersCtrl.DeleteUser);
  }
}