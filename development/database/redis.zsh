rd_run(){
    local redis_url=$(grep -E '^REDIS_URL=' .env | cut -d '=' -f2-)

    if [[ -z "$redis_url" ]]; then
        echo "❌ REDIS_URL not found in .env"
        return 1
    fi

  local redis_pass=$(echo "$redis_url" | sed -n 's|.*://[^:]*:\([^@]*\)@.*|\1|p')
  local redis_host=$(echo "$redis_url" | sed -n 's|.*://[^@]*@\(.*\)|\1|p')

  REDISCLI_AUTH="$redis_pass" redis-cli -u "rediss://$redis_host" "$@"
}

rdp() {
    rd_run "PING"
}

rdi(){
    rd_run "DBSIZE"
    rd_run KEYS "*"
}

rdg(){
    rd_run GET "$1"
}

rds(){
    rd_run SET "$1" "$2"
}

rdlp(){
    rd_run LPUSH "$1" "$2"
}

rdlr(){
    rd_run LRANGE "$1" 0 -1
}

rdzr(){
    rd_run ZRANGE "$1" 0 -1 WITHSCORES
}

rdd(){
    rd_run DEL "$1"
}

rdf(){
    rd_run FLUSHALL
}