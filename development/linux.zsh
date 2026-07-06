sudox() {
  local env_file=".env"
  local password=$(grep '^LINUX_PWD=' "$env_file" | cut -d '=' -f2-)

  if [[ -z "$password" ]]; then
    echo "❌ LINUX_PWD not found in $env_file"
    return 1
  fi

  echo "$password" | sudo -S "$@"
}

us(){
  sudo pacman -Syyu
}

uv(){
  yay -S visual-studio-code-bin
}