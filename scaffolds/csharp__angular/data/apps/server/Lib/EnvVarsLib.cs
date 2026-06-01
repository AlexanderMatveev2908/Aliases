namespace UserAccountsApi.LibNS;

public static class EnvVarsLib
{
  private static readonly string[] KEYS =
{
    "REDIS_HOST",
    "REDIS_PORT",
    "REDIS_PASSWORD",
    "FRONTEND_URL",
    "FRONTEND_URL_DEV",
    "CLOUD_NAME",
    "CLOUD_API_KEY",
    "CLOUD_API_SECRET",
    "CLOUD_URL",
    "DB_HOST",
    "DB_PORT",
    "DB_DATABASE",
    "DB_USER",
    "DB_PWD",
    "DB_URL"
  };

  public static string Get(string key)
  {
    string? val = Environment.GetEnvironmentVariable(key);

    if (val is null)
      throw new ErrApp(
          $"Environment variable '{key}' is not set"
      );

    return val;
  }

  public static void CheckEnvVars()
  {
    foreach (string key in KEYS)
    {
      Get(key);
    }
  }
}