# sudo pacman -S dotnet-host dotnet-runtime-9.0 aspnet-runtime-9.0 dotnet-sdk-9.0
# imstall also host

csc() {
    dotnet new console -n "$1" || return
    cd "$1" || return

    cat > Program.cs <<EOF
namespace Script;

public static class Program
{
    public static void Main()
    {
        Console.WriteLine("Hello World");
    }
}
EOF
}

csr(){
  dotnet run
}

csa(){
  dotnet add package "$@"
}

csu(){
  dotnet remove package "$@"
}

