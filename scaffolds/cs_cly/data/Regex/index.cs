using System.Text.RegularExpressions;
using GEmojiSharp;

namespace Script.RegexLib;

public static class RegexLib
{
  public static readonly Regex StartsWithEmoji =
        new($"^{Emoji.RegexPattern}", RegexOptions.Compiled);
}