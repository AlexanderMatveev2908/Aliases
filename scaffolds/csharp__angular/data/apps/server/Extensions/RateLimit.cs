using UserAccountsApi.FilterNS.RateLimitNS;

namespace UserAccountsApi.ExtensionsNS.RateLimitNS;


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