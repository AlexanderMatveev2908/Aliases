totp() {
  local code 
  code=$(oathtool --totp -b "$1")
  echo $code | wl-copy &&
  echo "copied $code"
}

sen() {
  mkdir -p "$1" && \
  gocryptfs -init "$1"
}

uef() {
  mkdir -p .dec && \
  gocryptfs .enc .dec && \
  xdg-open .dec
}

ldf() {
  fusermount -u .dec
}

random_b(){
  od -An -N2 -i /dev/urandom | tr -d ' ' | awk -v max=$1 '{print $1 % max}'
}

pp(){
 ( 
  cd /home/ninja/Scripts/pwd_generator/app || exit 1
  local pwd=$(jr)

  echo "$pwd" | wl-copy &&
  echo "copied $pwd"
  )
}