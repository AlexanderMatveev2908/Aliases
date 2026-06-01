using UserAccountsApi.ConfigNS.SqlNS;
using UserAccountsApi.ControllersNS.UsersNS;
using UserAccountsApi.FiltersNS.UsersNS;

namespace UserAccountsApi.RoutesNS.UserNS;

public static class UsersRouter
{
  public static void MapApi(RouteGroupBuilder api)
  {
    api.MapPost(
     "/users", UsersCtrl.PostUser)
 .AddEndpointFilter<UsersFilter>();

    api.MapDelete("/users/{userId:int}", UsersCtrl.DeleteUser);
  }
}