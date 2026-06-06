dbc(){
  docker build -t client .
}

drc(){
  dkillports
  
  docker run --rm -p 3001:3001 client
}

dbs(){
  docker build -t server .
}

drs(){
  dkillports

  docker run --rm -p 3000:3000 --env-file .env server
}

dki(){
  docker ps -a && docker images
}

dkca(){
  echo "🐳 Stopping containers..."
  docker stop $(docker ps -aq) 2>/dev/null

  echo "🐳 Removing containers..."
  docker rm $(docker ps -aq) 2>/dev/null

  echo "🐳 Removing images..."
  docker rmi $(docker images -aq) 2>/dev/null

  echo "🐳 Removing volumes..."
  docker volume rm $(docker volume ls -q) 2>/dev/null

  echo "🐳 Removing unused networks..."
  docker network prune -f
}

dkillports() {
  echo "🐳 Removing old containers..."
  docker rm -f $(docker ps -aq) 2>/dev/null

  echo "🧹 Killing port 3000..."
  kill -9 $(lsof -ti tcp:3000) 2>/dev/null

  echo "🧹 Killing port 3001..."
  kill -9 $(lsof -ti tcp:3001) 2>/dev/null
}

dkba(){
  (
    cd apps/Client && dbc
  )

  (
    cd apps/Server && dbs
  )
}

dkra(){
  dkillports

  (
    cd apps/Client && drc &
  )

   (
    cd apps/Server && drs &
  )

  sleep 8

  firefox https://localhost &
}