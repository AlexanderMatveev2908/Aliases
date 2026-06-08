using Server.ModelsNS.UserNS;

namespace Server.ModelsNS.RefreshTokensNS;

public class RefreshToken
{
  public int Id { get; set; }

  public int UserId { get; set; }
  public User User { get; set; } = null!;

  public string TokenHash { get; set; } = null!;

  public DateTime ExpiresAt { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}