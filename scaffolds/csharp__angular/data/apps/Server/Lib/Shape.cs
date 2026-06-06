namespace InvoicesApp.LibNS.ShapeNS;

public static class LibShape
{
  private static string ToCamelCase(string txt)
  {
    if (string.IsNullOrEmpty(txt))
      return txt;

    return char.ToLowerInvariant(txt[0]) + txt[1..];
  }

  public static object Merge<T>(T dto, object extra)
  {
    Dictionary<string, object?> dict = [];

    foreach (var p in typeof(T).GetProperties())
    {
      dict[ToCamelCase(p.Name)] = p.GetValue(dto);
    }

    foreach (var p in extra.GetType().GetProperties())
    {
      dict[ToCamelCase(p.Name)] = p.GetValue(extra);
    }

    return dict;
  }
}