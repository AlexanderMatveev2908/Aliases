using Server.TypesNS.UserNS;

namespace Server.ModelsNS.UserNS;


public class User
{
  public int Id { get; set; }
  public string FirstName { get; set; } = null!;
  public string LastName { get; set; } = null!;
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;
  public bool IsTrainer { get; set; }

  public User()
  {
  }

  public User(RegisterDto dto)
  {
    FirstName = dto.FirstName;
    LastName = dto.LastName;
    Email = dto.Email;
    Password = dto.Password;
    IsTrainer = dto.IsTrainer!.Value;
  }
}