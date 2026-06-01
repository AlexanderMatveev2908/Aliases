using UserAccountsApi.ValidatorsNS;

namespace UserAccountsApi.FiltersNS.UsersNS;


public class UsersFilter : IEndpointFilter
{

  public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext ctx, EndpointFilterDelegate next)
  {
    IResult? errorResult =
     await UsersCheck.Check(ctx.HttpContext);

    if (errorResult is not null)
      return errorResult;


    return await next(ctx);
  }
}