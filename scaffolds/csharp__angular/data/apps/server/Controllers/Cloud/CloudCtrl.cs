using UserAccountsApi.LibNS;
using UserAccountsApi.ServicesNS.CLoudNS;

namespace UserAccountsApi.ControllersNS.CloudNS;


public static class CloudCtrl
{
  public static async Task<IResult> PostFile(IFormFile file)
  {
    var result = await CloudSvc.UploadSingle(file);

    return Res.Json(200, "File uploaded", new
    {
      result
    });

  }

  public static async Task<IResult> DeleteFile(HttpContext ctx, string publicId, string resourceType)
  {

    await CloudSvc.Delete(publicId, resourceType);

    return Res.Json(200, "File deleted");
  }
}