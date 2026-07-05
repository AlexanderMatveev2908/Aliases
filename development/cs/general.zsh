csr(){
  dotnet run
}

csa(){
  dotnet add package "$@"
}

csu(){
  dotnet remove package "$@"
}

