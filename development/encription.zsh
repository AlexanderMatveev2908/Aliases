jwts() {
  local secret

  secret="$(openssl rand -hex 64)"

  echo -n "$secret" | wl-copy

  echo "✅ Copied JWT secret:"
  echo "$secret"
}