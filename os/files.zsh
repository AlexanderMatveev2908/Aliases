ewd() {
  echo "⚠️ Are you sure you want to delete *all* content in: $PWD ? (y/n)"
  read -r reply
  if [[ "$reply" == "y" || "$reply" == "Y" ]]; then
    rm -rf ./{*,.*}(N)
    echo "✅ Directory contents deleted."
  else
    echo "❌ Aborted."
  fi
}
