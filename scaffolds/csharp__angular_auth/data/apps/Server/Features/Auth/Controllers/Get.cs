using System.Security.Claims;
using Server.LibNS;
using Server.ModelsNS.UserNS;

namespace Server.FeaturesNS.AuthNS;

public static class AuthGetCtrl
{
  public static IResult GetProtected(HttpContext ctx)
  {

    User user =
    (User)ctx.Items["user"]!;


    // foreach (Claim claim in user.Claims)
    // {
    //   Console.WriteLine($"{claim.Type}: {claim.Value}");
    // }

    return Res.Json(200, "protected data", new
    {
      id = user.Id,
      email = user.Email,
    });
  }

  public static IResult TestLimiter()
  {
    return Res.Json(200, "limited");
  }
}