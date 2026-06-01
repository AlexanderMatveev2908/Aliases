using CloudinaryDotNet;
using UserAccountsApi.LibNS;

namespace UserAccountsApi.ConfigNS.CloudNS;


public static class CloudConf
{
  public static Cloudinary Connection
  {
    get;
    private set;
  } = null!;

  public static async Task Connect()
  {
    Account account = new(
       EnvVarsLib.Get("CLOUD_NAME"),
       EnvVarsLib.Get("CLOUD_API_KEY"),
       EnvVarsLib.Get("CLOUD_API_SECRET")
   );
    Connection = new Cloudinary(account);
    var result = await Connection.PingAsync();

    Console.WriteLine(
        $"☁️ Cloud connected: {result.StatusCode} ☁️"
    );
  }

}