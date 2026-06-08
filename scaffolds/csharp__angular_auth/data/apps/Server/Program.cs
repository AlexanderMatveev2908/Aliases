using DotNetEnv;
using Microsoft.AspNetCore.Builder;
using Server.ConfigNS.CloudNS;
using Server.ConfigNS.RedisNS;
using Server.ConfigNS.SettingsNS;
using Server.LibNS.EnvNS;

Env.Load();
EnvVarsLib.CheckEnvVars();

var builder = WebApplication.CreateBuilder(args);

SettingsConf.ConfigureBuilder(builder);

await RedisConf.Connect();
await CloudConf.Connect();

var app = builder.Build();

await SettingsConf.ConfigureApp(app);

app.Run();

