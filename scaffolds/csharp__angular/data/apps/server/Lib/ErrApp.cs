namespace UserAccountsApi.LibNS;

public class ErrApp : Exception
{
  public int Status { get; set; }

  public ErrApp(string message, int status = 500) : base($"❌ {message}")
  {
    Status = status;
  }

}