using System.Text;
using UserAccountsApi.Lib;

namespace UserAccountsApi.MiddlewareNS;

public static class LoggerMdw
{
  private static async Task<string> ReadBody(HttpRequest? req)
  {
    string body = "";

    if (
    req?.ContentType?
    .StartsWith("multipart/form-data")
    == true
)
      return "multipart body skipped";


    if (req?.ContentLength > 0)
    {
      using (var reader = new StreamReader(req.Body, Encoding.UTF8, leaveOpen: true))
      {
        body = await reader.ReadToEndAsync();
        req.Body.Position = 0;
      }
    }

    return body;
  }

  private static async Task<object> BuildObj(HttpContext ctx)
  {
    var req = ctx.Request;

    var body = await ReadBody(req);

    var logObj = new
    {
      Timestamp = DateTime.UtcNow.ToString("HH:mm:ss"),
      req?.Method,
      Path = req?.Path.ToString(),
      Query = req?.Query.ToDictionary(
        q => q.Key,
        q => q.Value.ToString()
    ),
      Headers = req?.Headers.ToDictionary(
        h => h.Key,
        h => h.Value.ToString()),
      RouteParams = ctx.Request.RouteValues,
      Body = body,
    };

    return logObj;
  }

  private static async Task<List<object>> ReadExistingLogs(string logFilePath)
  {
    List<object> logs = [];

    if (File.Exists(logFilePath))
    {
      string existingJson =
          await File.ReadAllTextAsync(logFilePath);

      if (!string.IsNullOrWhiteSpace(existingJson))
      {
        logs = JsonParserLib.Parse<List<object>>(existingJson) ?? [];
      }
    }

    return logs;
  }

  private static async Task Log(object logObj)
  {
    string cwd = Directory.GetCurrentDirectory();
    string logDirectory =
        Path.Combine(cwd, ".logger");
    string logFilePath =
        Path.Combine(logDirectory, "requests.json");

    if (!Directory.Exists(logDirectory))
      Directory.CreateDirectory(logDirectory);


    List<object> logs = await ReadExistingLogs(logFilePath);
    logs.Add(logObj);

    string updatedJson = JsonParserLib.Stringify(logs);

    await File.WriteAllTextAsync(
   logFilePath,
   updatedJson
);

  }

  public static async Task LogRequest(HttpContext ctx)
  {
    var req = ctx.Request;
    req.EnableBuffering();

    var logObj = await BuildObj(ctx);

    await Log(logObj);
  }
}