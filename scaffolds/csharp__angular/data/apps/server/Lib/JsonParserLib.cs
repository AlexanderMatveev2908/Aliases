using System.Text.Json;
using UserAccountsApi.LibNS;

namespace UserAccountsApi.Lib;

public static class JsonParserLib
{
  public static T? Parse<T>(string json)
  {
    try
    {
      return JsonSerializer.Deserialize<T>(json
      );
    }
    catch (JsonException ex)
    {
      throw new ErrApp($"Invalid JSON format => {ex.Message}");
    }
  }

  public static string Stringify<T>(T obj)
  {
    try
    {
      return JsonSerializer.Serialize(obj,
       new JsonSerializerOptions
       {
         WriteIndented = true
       });
    }
    catch (JsonException ex)
    {
      throw new ErrApp($"Error serializing object to JSON => {ex.Message}");
    }
  }
}