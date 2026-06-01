using StackExchange.Redis;
using UserAccountsApi.LibNS;

namespace UserAccountsApi.ConfigNS.RedisNS;

public static class RedisConf
{
  public static IConnectionMultiplexer Connection { get; private set; } = null!;


  public static async Task Connect()
  {
    string host = EnvVarsLib.Get("REDIS_HOST");
    string portStr = EnvVarsLib.Get("REDIS_PORT");
    int port = int.Parse(portStr);
    string password = EnvVarsLib.Get("REDIS_PASSWORD");

    ConfigurationOptions opt = new()
    {
      EndPoints =
            {
                { host, port }
            },
      User = "default",
      Password = password,
      Ssl = true,
      AbortOnConnectFail = false
    };

    Connection = await ConnectionMultiplexer.ConnectAsync(opt);
    IDatabase db = Connection.GetDatabase();

    TimeSpan ping = await db.PingAsync();
    Console.WriteLine(
               $"💾 Redis ping: {ping.TotalMilliseconds} ms 💾"
           );

  }
}