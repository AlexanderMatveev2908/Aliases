yd() {
  echo "🧹 Cleaning old processes..."

  pkill -f "ng serve" 2>/dev/null
  pkill -f "dotnet watch" 2>/dev/null
  pkill -f "turbo" 2>/dev/null

  lsof -ti:3000 | xargs -r kill -9
  lsof -ti:3001 | xargs -r kill -9

  echo "🚀 Starting dev..."

  yarn dev
}

ys(){
  echo "🧹 Cleaning old processes..."

  pkill -f "ng serve" 2>/dev/null
  pkill -f "dotnet watch" 2>/dev/null
  pkill -f "turbo" 2>/dev/null

  lsof -ti:3000 | xargs -r kill -9
  lsof -ti:3001 | xargs -r kill -9

  echo "🚀 Starting prod..."

  yarn start
}

