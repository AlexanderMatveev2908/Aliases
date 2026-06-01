namespace UserAccountsApi.MiddlewareNS;

public static class MainMdw
{
  public static void UseMainMdw(WebApplication app)
  {
    app.Use(async (ctx, next) =>
{
  await LoggerMdw.LogRequest(ctx);
  await next();
});
  }
}