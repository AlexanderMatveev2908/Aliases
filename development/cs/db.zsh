dbm(){
  dotnet ef migrations add "$1" &&
  dotnet ef database update
}

dbml(){
  dotnet ef migrations list
}

dbmu(){
  dotnet ef database update "$1"
}

dbda(){
  dotnet ef database update 0 &&
  rm -rf Migrations && \
  sqlda
}

kaa(){
pkill -f "ng serve"
pkill -f "dotnet watch"

rm -rf .angular
rm -rf node_modules/.vite
rm -rf apps/client/.angular
rm -rf apps/client/node_modules/.vite

yarn install
yarn dev
}