fss(){
  cat .env | fly secrets import -a "$1"
}