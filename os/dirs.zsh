wa() {
  cd /home/ninja/Documents/PROJECTS/FrontendMentorProjects/RecipesApp || return 1;

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

