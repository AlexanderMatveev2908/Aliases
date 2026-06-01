snake_case() {
  echo "$1" \
    | sed -r 's/([A-Z])/_\L\1/g; s/^_//' \
    | tr ' -' '_' \
    | tr -s '_'
}
camel_case() {
  echo "$1" \
    | sed -r 's/[-_]+/ /g; s/(^| )([a-z])/\U\2/g; s/ //g' \
    | sed -r 's/^(.)/\L\1/'
}
pascal_case() {
  echo "$1" | sed -r 's/[-_]+/ /g; s/(^| )([a-z])/\U\2/g; s/ //g'
}
kebab_case() {
  echo "$1" | sed -r 's/([A-Z])/-\L\1/g; s/^-//' | tr '_' '-' | tr -s '-'
}



