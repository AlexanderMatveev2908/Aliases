FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /app

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app

COPY --from=build /publish .

ENV ASPNETCORE_HTTP_PORTS=3000

EXPOSE 3000

CMD ["dotnet", "InvoicesApp.dll"]