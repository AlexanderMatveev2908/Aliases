dy() {
  local outdir=$PWD

  local filename="$(uuidgen).%(ext)s"

  yt-dlp -o "$outdir/$filename" "$1"

  local saved_file=$(ls -t "$outdir" | head -n1)

  echo "$outdir/$saved_file" | wl-copy

  echo "📥 => $outdir/$saved_file"
}

ov(){
    xdg-open "$1"
}