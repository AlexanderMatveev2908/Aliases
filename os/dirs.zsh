wa() {
  cd /home/ninja/Scripts/java_package_manager/app || return 1;

  if [[ "$1" == "0" ]]; then
    cd apps/Server || return
  elif [[ "$1" == "1" ]]; then
    cd apps/Client || return
  else
    return 0
  fi
}

was(){
  wa 0
}
wac(){
  wa 1
}

