using Microsoft.AspNetCore.Http;

namespace InvoicesApp.LibNS;

public static class Res
{
  public static IResult Json(
    int status,
    string msg,
    object? data = null
)
  {
    return Results.Json(
          new
          {
            status,
            msg,
            data
          },
          statusCode: status
      );
  }
}