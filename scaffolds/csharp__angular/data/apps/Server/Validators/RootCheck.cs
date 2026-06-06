using System.ComponentModel.DataAnnotations;
using InvoicesApp.LibNS;
using Microsoft.AspNetCore.Http;
using System.Collections;
namespace Server.ValidatorsNS.RootNS;

public static class RootCheck
{
  public static async Task<IResult?> Check<T>(HttpContext ctx)
  {
    if (!ctx.Request.HasJsonContentType())
      return Res.Json(415, "Content-Type must be application/json");

    T? dto;

    try
    {
      dto = await ctx.Request.ReadFromJsonAsync<T>();
    }
    catch
    {
      return Res.Json(400, "Invalid JSON body");
    }

    if (dto is null)
      return Res.Json(400, "Request body is required");

    List<ValidationResult> errors = [];
    bool isValid = TryValidateRecursive(dto, errors);

    if (!isValid)
    {
      var formattedErrors = errors.Select(err => new
      {
        Field = err.MemberNames.FirstOrDefault(),
        Message = err.ErrorMessage
      });

      return Res.Json(400, "Validation failed", new
      {
        errors = formattedErrors
      });
    }

    ctx.Items["dto"] = dto;

    return null;
  }

  private static bool TryValidateRecursive(
    object dto,
    List<ValidationResult> errors
  )
  {
    bool isValid = true;
    ValidationContext ctx = new(dto);

    isValid &= Validator.TryValidateObject(
    dto,
    ctx,
    errors,
    validateAllProperties: true
  );

    foreach (var prop in dto.GetType().GetProperties())
    {
      object? val = prop.GetValue(dto);

      if (val is null)
        continue;

      if (val is string)
        continue;

      if (val is IEnumerable list)
      {
        foreach (object? item in list)
        {
          if (item is null)
            continue;

          isValid &= TryValidateRecursive(item, errors);
        }

        continue;
      }

      if (!prop.PropertyType.IsValueType)
      {
        isValid &= TryValidateRecursive(val, errors);
      }
    }

    return isValid;
  }
}