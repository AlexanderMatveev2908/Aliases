using System.ComponentModel.DataAnnotations;

namespace UserAccountsApi.TypesNS;

public sealed class UsersDto
{
  [Required]
  [MinLength(3)]
  public string FirstName { get; set; } = null!;
  [Required]
  [MinLength(3)]
  public string LastName { get; set; } = null!;

  [Required]
  [EmailAddress]
  public string Email { get; set; } = null!;

  [Required]
  [MinLength(8)]
  [RegularExpression(
    @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$",
    ErrorMessage =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
)]
  public string Password { get; set; } = null!;
}