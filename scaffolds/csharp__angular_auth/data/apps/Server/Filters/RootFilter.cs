using Microsoft.AspNetCore.Http;
using Server.ValidatorsNS.RootNS;

namespace Server.FiltersNS.RootNS;

public class RootFilter<T> : IEndpointFilter
{
  public async ValueTask<object?> InvokeAsync(
    EndpointFilterInvocationContext ctx,
    EndpointFilterDelegate next
  )
  {
    IResult? errorResult =
      await RootCheck.Check<T>(ctx.HttpContext);

    if (errorResult is not null)
      return errorResult;

    return await next(ctx);
  }
}