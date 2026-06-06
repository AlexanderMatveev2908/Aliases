using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Server.FiltersNS.RootNS;

namespace Server.ExtensionsNS.RootNS;

public static class RootExtension
{
  public static RouteHandlerBuilder WithBodyChecked<T>(
    this RouteHandlerBuilder route
  )
  {
    return route.AddEndpointFilter<RootFilter<T>>();
  }
}