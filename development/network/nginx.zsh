ngxc(){
  if [[ $1 == 'd' ]]; then
    code /etc/nginx/env/dev.conf
  elif [[ $1 == 'k' ]]; then
    code /etc/nginx/env/kind.conf
  else
    code /etc/nginx/nginx.conf
  fi
}

ngxs(){
sudox systemctl status nginx
}

ngx() {
  local env="dev"
  [[ "$1" == "k" ]] && env="kind"

  local target="/etc/nginx/env/${env}.conf"
  local active="/etc/nginx/env/active.conf"

  # Switch symlink
  sudox ln -sf "$target" "$active"

  # Test config before applying
  if sudox nginx -t; then
    if systemctl is-active --quiet nginx; then
      echo "♻️  Reloading nginx with $env config..."
      sudox systemctl reload nginx
    else
      echo "🚀 Starting nginx with $env config..."
      sudox systemctl start nginx
    fi
  else
    echo "❌ Config error, not reloading"
  fi
}


ngxk(){
sudox systemctl stop nginx
sudox pkill -9 nginx
echo '🔪 nginx killed'
}

ngxr(){
sudox systemctl reload nginx
}

ngxl(){
sudox tail -f /var/log/nginx/access.log
}

ngxle(){
sudox tail -f /var/log/nginx/error.log
}
