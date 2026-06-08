using Server.FilterNS.JwtND;

namespace Server.ExtensionsNS.JwtNS;

public static class JwtExt
{
  public static RouteHandlerBuilder WithJwtCheck(
            this RouteHandlerBuilder builder
  )
  {
    builder.AddEndpointFilter<JwtFilter>();

    return builder;
  }
}