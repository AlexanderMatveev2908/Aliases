# sudo pacman -S dotnet-host dotnet-runtime-9.0 aspnet-runtime-9.0 dotnet-sdk-9.0
# imstall also host

csc(){
   dotnet new console -n "$1" && cd "$1"
}

csr(){
  dotnet run
}

csf(){
  dotnet format
}

csw(){
  dotnet watch run --launch-profile http
}

csa(){
  dotnet add package "$@"
}

csu(){
  dotnet remove package "$@"
}

