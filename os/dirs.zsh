wa() {
  cd /home/ninja/Documents/PROJECTS/FRONTEND_MENTOR/InvoicesApp || return 1;

  if [[ "$1" == "0" ]]; then
    cd apps/server || return
  elif [[ "$1" == "1" ]]; then
    cd apps/client || return
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

