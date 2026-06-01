z() {
  local target="${1%/}"
  local abs_target="$(realpath "$target")" || return 1
  
  local base="$(basename "$abs_target")"
  local dir="$(dirname "$abs_target")"

  (cd "$dir" && zip -r "${abs_target}.zip" "$base")
}

uz() {
  local file="$1"
  local dir="$(dirname "$file")"
  local base="$(basename "$file")"
  local name="${base%.*}"   
  local target="${dir}/${name}"

  mkdir -p "$target"
  yes | unzip -o "$file" -d "$target"
}

tz() {
  local dir_path="$1"
  local base_name="$(basename "$dir_path")"
  tar -czvf "${base_name}.tar.gz" -C "$dir_path" .
}

tu() {
  local file="$1"
  local name="$(basename "$file")"
  local target

  if [[ "$file" == *.tar.gz ]]; then
    target="${name%.tar.gz}"
    tar -xzvf "$file" -C .        # just extract here
  elif [[ "$file" == *.tar ]]; then
    target="${name%.tar}"
    tar -xvf "$file" -C .
  else
    echo "❌ Unsupported file type: $file"
    return 1
  fi
}
