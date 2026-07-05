gi() {
  if [[ -z $1 ]]; then
    echo "❌ missing git repo url"
    return 1
  fi

  git init
  git add .
  git commit -m "🛠️ setup repo with custom scaffold"
  git remote add origin "$1"
  git push -u origin main
}

gs() { 
  if [[ $1 == 'f' ]]; then
    git fetch origin 
  fi

  git status
}

gbl() {
  git branch 
}

gb(){
  git branch --show-current
}

grh() {
git reset --hard HEAD
}

gp() {
  local branch=$(git rev-parse --abbrev-ref HEAD)

  git add .
  git commit -m "${branch} => $*" && git push -u origin "$branch"
}

gl(){
  git log --oneline --graph --decorate
}

gfmc(){
  git reset --soft "$1"
  git commit -m "merged messy commits 👻"
  git push origin main --force
}

  gcb() {
  [[ -z "$1" ]] && {
    echo "❌ Usage: gcb <branch-name>"
    return 1
  }

  git switch -c "$1"
}

gmm() {
  local feature_branch="$(git branch --show-current)"

  [[ -z "$feature_branch" ]] && {
    echo "❌ Not inside a Git branch"
    return 1
  }

  [[ "$feature_branch" == "main" ]] && {
    echo "❌ You are already on main"
    return 1
  }

  echo "🌿 Feature branch: $feature_branch"

  echo "⬇️ Updating main..."
  git fetch origin main || return 1

  git switch main || return 1
  git pull origin main || return 1

  echo "🔀 Merging $feature_branch into main..."

  git merge \
    --no-ff \
    -X theirs \
    -m "merge $feature_branch branch into main" \
    "$feature_branch" || return 1

  echo "🚀 Pushing main..."
  git push origin main || return 1

  echo "🗑️ Deleting local branch..."
  git branch -D "$feature_branch" || return 1

  echo "☁️ Deleting remote branch..."
  git push origin --delete "$feature_branch" 2>/dev/null

  echo "✅ $feature_branch merged into main"
  echo "🧹 Local and remote feature branches removed"
}

gpos() {
  local current_branch="$(git branch --show-current)"

  [[ -z "$current_branch" ]] && {
    echo "❌ Not inside a Git branch"
    return 1
  }

  echo "🌿 Current branch: $current_branch"
  echo "⬇️ Fetching latest changes..."

  git fetch origin "$current_branch" || return 1

  echo "🔀 Merging origin/$current_branch into $current_branch..."

  git merge \
    --no-ff \
    -X ours \
    -m "merge($current_branch): pull latest remote changes preferring local" \
    "origin/$current_branch" || return 1

  echo "✅ Pulled latest changes into $current_branch"
  echo "🛡️ Local changes were preferred on conflicts"
}

gpts() {
  local current_branch="$(git branch --show-current)"

  [[ -z "$current_branch" ]] && {
    echo "❌ Not inside a Git branch"
    return 1
  }

  echo "🌿 Current branch: $current_branch"
  echo "⬇️ Fetching latest changes..."

  git fetch origin "$current_branch" || return 1

  echo "🔀 Merging origin/$current_branch into $current_branch..."
  git merge \
    --no-ff \
    -X theirs \
    -m "merge($current_branch): pull latest remote changes preferring remote" \
    "origin/$current_branch" || return 1

  echo "✅ Pulled latest changes into $current_branch"
  echo "☁️ Remote changes were preferred on conflicts"
}

gtb() {
  local current_branch="$(git branch --show-current)"

  if [[ "$current_branch" == "main" ]]; then
    local feature_branch

    feature_branch="$(
      git branch --format='%(refname:short)' |
      grep -v '^main$' |
      head -n 1
    )"

    [[ -z "$feature_branch" ]] && {
      echo "❌ No secondary branch found"
      return 1
    }

    git switch "$feature_branch"
    return
  fi

  git switch main
}

gdb(){
branch="$1"

# Check if a branch name was provided
if [[ -z "$branch" ]]; then
  echo "Usage: $0 <branch>"
  exit 1
fi

# Get the current branch
current_branch=$(git branch --show-current)

# Prevent deleting the branch we're currently on
if [[ "$branch" == "$current_branch" ]]; then
  echo "❌ Cannot delete the branch you're currently on."
  echo "👉 Switch to another branch first."
  exit 1
fi

echo "🗑️ Deleting local branch '$branch'..."
git branch -D "$branch" || exit 1

echo "🌐 Deleting remote branch '$branch'..."
git push origin --delete "$branch" || exit 1

echo "✅ Branch '$branch' deleted locally and remotely."
}