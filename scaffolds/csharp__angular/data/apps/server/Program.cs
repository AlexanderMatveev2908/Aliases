using DotNetEnv;
using UserAccountsApi.LibNS;
using UserAccountsApi.ConfigNS.RedisNS;
using UserAccountsApi.ConfigNS;
using UserAccountsApi.ConfigNS.CloudNS;


Env.Load();
EnvVarsLib.CheckEnvVars();

var builder = WebApplication.CreateBuilder(args);
SettingsConf.ConfigureBuilder(builder);

await RedisConf.Connect();
await CloudConf.Connect();

var app = builder.Build();
await SettingsConf.ConfigureApp(app);

app.Run();

