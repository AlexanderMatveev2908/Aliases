
using StackExchange.Redis;
using Server.ConfigNS.RedisNS;
using Microsoft.AspNetCore.Http;

namespace Server.ServicesNS.RedisNS;

public static class RateLimitSvc
{
  public static async Task<TimeSpan?> Limit(HttpContext ctx, TimeSpan window, int limit)
  {
    IDatabase db =
                RedisConf.Connection.GetDatabase();

    string ip =
              ctx.Connection
                  .RemoteIpAddress?.ToString()
              ?? "unknown";
    if (ip == "::1")
    {
      ip = "127.0.0.1";
    }

    string path =
        ctx.Request.Path;
    string method =
        ctx.Request.Method;

    string key =
                $"rl:{ip}:{path}:{method}";

    int requests =
            (int)await db.StringIncrementAsync(key);

    if (requests == 1)
    {
      await db.KeyExpireAsync(
          key,
          window
      );
    }
    int remaining =
           Math.Max(0, limit - requests);

    TimeSpan? ttl = await db.KeyTimeToLiveAsync(key);

    ctx.Response.Headers["RateLimit-Limit"] =
              limit.ToString();
    ctx.Response.Headers["RateLimit-Remaining"] =
        remaining.ToString();
    ctx.Response.Headers["RateLimit-Reset"] =
        ((int)(ttl?.TotalSeconds ?? window.TotalSeconds)).ToString();


    if (requests > limit)
      return await db.KeyTimeToLiveAsync(key);

    return null;
  }
}