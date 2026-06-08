using System.ComponentModel.DataAnnotations;
using Server.TypesNS.AuthNS;

namespace Server.TypesNS.UserNS;

public sealed class RegisterDto : LoginDto
{
  [Required]
  [MinLength(3)]
  public string FirstName { get; set; } = null!;
  [Required]
  [MinLength(3)]
  public string LastName { get; set; } = null!;

  [Required]
  public bool? IsTrainer { get; set; }
}