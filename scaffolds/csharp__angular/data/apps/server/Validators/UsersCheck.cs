using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;
using UserAccountsApi.LibNS;
using UserAccountsApi.TypesNS;

namespace UserAccountsApi.ValidatorsNS;

public static class UsersCheck
{
  public static async Task<IResult?> Check(HttpContext ctx)
  {
    if (!ctx.Request.HasJsonContentType())
      return Res.Json(415, "Content-Type must be application/json");


    UsersDto? dto = await ctx.Request.ReadFromJsonAsync<UsersDto>();

    if (dto is null)
      return Res.Json(400, "Invalid JSON body");

    List<ValidationResult> errors = new();
    ValidationContext validationContext = new(dto);

    bool isValid = Validator.TryValidateObject(
          dto,
          validationContext,
          errors,
          validateAllProperties: true
        );

    if (!isValid)
      return Res.Json(400, "Invalid user data", new
      {
        errors = errors.Select(e => new
        {
          field = e.MemberNames.FirstOrDefault(),
          error = e.ErrorMessage
        })
      });

    ctx.Items["user"] = dto;

    return null;
  }


}