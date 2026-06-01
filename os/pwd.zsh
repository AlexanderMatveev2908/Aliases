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

pp() {
  nums=(0 1 2 3 4 5 6 7 8 9)
  uppers=(A B C D E F G H I J K L M N O P Q R S T U V W X Y Z)
  lowers=(a b c d e f g h i j k l m n o p q r s t u v w x y z)
  symbols=('!' '@' '#' '$' '%' '^' '&' '*' '(' ')' '_' '+' '-' '{' '}' ',' '.')

  local single_len=5
  local pwd=""

  for arr in nums uppers lowers symbols; do
    local arr_len=${(P)#${arr}}
    for ((i=1; i <= single_len; i++)); do
      local random_val=$(random_b $arr_len)
      pwd+=${(P)${arr}[$((random_val+1))]}
    done
  done


  pwd=$(echo "$pwd" | fold -w1 | shuf | tr -d '\n')

  echo "$pwd" | wl-copy &&
  echo "copied $pwd"
}
