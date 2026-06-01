using UserAccountsApi.LibNS;
using UserAccountsApi.ServicesNS.RedisNS;

namespace UserAccountsApi.FilterNS.RateLimitNS;


public sealed class RateLimitFilter : IEndpointFilter
{
  private readonly TimeSpan _window;
  private readonly int _limit;


  public RateLimitFilter(TimeSpan window, int limit)
  {
    _window = window;
    _limit = limit;
  }

  public async ValueTask<object?> InvokeAsync(
    EndpointFilterInvocationContext ctx,
    EndpointFilterDelegate next
)
  {
    HttpContext http = ctx.HttpContext;

    TimeSpan? ttl = await RateLimitSvc.Limit(
        http,
        _window,
        _limit
    );


    if (ttl.HasValue)
    {
      http.Response.StatusCode = StatusCodes.Status429TooManyRequests;

      return Res.Json(429, "Too many requests. Try again later.",
      new
      {
        retry_after_seconds = (int)ttl.Value.TotalSeconds
      });
    }

    return await next(ctx);
  }
}