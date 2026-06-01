gss() {
  local env_file="${1:-.env}"

  [[ ! -f "$env_file" ]] && {
    echo "❌ File not found: $env_file"
    return 1
  }

  gh api user >/dev/null || {
    echo "❌ GitHub CLI active account is not working."
    echo "👉 Run: gh auth login"
    return 1
  }

  git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
    echo "❌ You are not inside a Git repository."
    return 1
  }

  echo "🔐 Uploading secrets from: $env_file"

  gh secret set -f "$env_file" || {
    echo "❌ Failed to upload secrets."
    return 1
  }

  echo "✅ Secrets uploaded successfully."
  echo "📦 Current repo secrets:"
  gh secret list
}