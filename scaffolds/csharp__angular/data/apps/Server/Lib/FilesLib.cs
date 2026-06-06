using Microsoft.AspNetCore.Http;

namespace Server.LibNS.FilesNS;


public static class FilesLib
{
  public static string MakeFilename(IFormFile file)
  {
    string ext =
 Path.GetExtension(
     file.FileName
 );
    string fileName =
        $"{Guid.NewGuid():N}{ext}";

    return fileName;
  }

  public static string ChainCurrDir(string folderName)
  {
    var cwd = Directory.GetCurrentDirectory();
    var chained = Path.Combine(
        cwd,
        folderName
    );
    Directory.CreateDirectory(Path.GetDirectoryName(chained)!);

    return chained;
  }
}