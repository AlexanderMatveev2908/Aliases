using System.Reflection;
using Server.LibNS.ErrNS;

namespace Server.LibNS.ShapeNS;

public static class LibShape
{
  private static string ToCamelCase(string txt)
  {
    if (string.IsNullOrEmpty(txt))
      return txt;

    return char.ToLowerInvariant(txt[0]) + txt[1..];
  }

  public static Dictionary<string, object?> ToDict<T>(T obj)
  {
    if (obj is null)
      throw new ErrApp("obj passed to ToDict is null");

    Dictionary<string, object?> dict = [];

    foreach (PropertyInfo prop in obj.GetType().GetProperties())
    {
      dict[ToCamelCase(prop.Name)] = prop.GetValue(obj);
    }

    return dict;
  }
  public static Dictionary<string, object?> Merge<T>(T dto, object extra)
  {
    Dictionary<string, object?> dict = ToDict(dto);


    foreach (var p in extra.GetType().GetProperties())
    {
      dict[ToCamelCase(p.Name)] = p.GetValue(extra);
    }

    return dict;
  }

  public static Dictionary<string, object?> RemoveKeys(
    Dictionary<string, object?> dict,
    params string[] keys
)
  {
    foreach (string key in keys)
    {
      dict.Remove(key);
    }

    return dict;
  }
}