namespace Script.ErrApp;


public class ErrApp : Exception
{
  public int Status { get; }

  public ErrApp(string message, int status)
      : base(message)
  {
    Status = status;
  }
}