using Server.FilterNS.RateLimitNS;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Server.ExtensionsNS.RateLimitNS;


public static class RateLimitExt
{
  public static RouteHandlerBuilder WithRateLimit(
        this RouteHandlerBuilder route,
        TimeSpan window,
        int limit
  )
  {
    return route.AddEndpointFilter(
           new RateLimitFilter(window, limit)
       );
  }
}