using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;

namespace Server.LibNS.TokensNS;

public static class RefreshTokensLib
{
  public static string Create()
  {
    byte[] bytes = RandomNumberGenerator.GetBytes(64);
    return Convert.ToBase64String(bytes);
  }

  public static string Hash(string token)
  {
    byte[] bytes =
        SHA256.HashData(
            Encoding.UTF8.GetBytes(token)
        );

    return Convert.ToHexString(bytes);
  }
}