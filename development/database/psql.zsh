# ----------------------------
# Safe .env reader
# Supports:
# DB_HOST=hello
# DB_HOST="hello world"
# DB_HOST='hello world'
# DB_PWD=abc/123+xyz==
# ----------------------------

_env_get() {
  local key="$1"
  local line value

  [[ -f .env ]] || {
    echo "❌ .env file not found"
    return 1
  }

  line="$(
    grep -E "^[[:space:]]*${key}[[:space:]]*=" .env | tail -n 1
  )"

  [[ -n "$line" ]] || {
    echo "❌ Missing env key: $key"
    return 1
  }

  # Remove everything before the first =
  value="${line#*=}"

  # Trim leading spaces
  value="${value#"${value%%[![:space:]]*}"}"

  # Trim trailing spaces
  value="${value%"${value##*[![:space:]]}"}"

  # Remove wrapping double quotes
  if [[ "$value" == \"*\" ]]; then
    value="${value#\"}"
    value="${value%\"}"
  fi

  # Remove wrapping single quotes
  if [[ "$value" == \'*\' ]]; then
    value="${value#\'}"
    value="${value%\'}"
  fi

  print -r -- "$value"
}

_load_env() {
  DB_HOST="$(_env_get DB_HOST)" || return 1
  DB_PORT="$(_env_get DB_PORT)" || return 1
  DB_USER="$(_env_get DB_USER)" || return 1
  DB_PWD="$(_env_get DB_PWD)" || return 1
  DB_DATABASE="$(_env_get DB_DATABASE)" || return 1
}

_psql_run() {
  _load_env || return 1

  PGPASSWORD="$DB_PWD" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_DATABASE" \
    "$@"
}

# ----------------------------
# Commands
# ----------------------------

# open interactive shell
sql() {
  _psql_run
}

# query full table
sqlq() {
  [[ -z "$1" ]] && {
    echo "⚠️ Usage: sqlq <table>"
    return 1
  }

  _psql_run <<EOF
\x
SELECT * FROM "$1";
EOF
}

# delete by id
sqld() {
  if [[ -z "$1" || -z "$2" ]]; then
    echo "⚠️ Usage: sqld <table> <id>"
    return 1
  fi

  _psql_run -x <<EOF
DELETE FROM "$1" WHERE "Id" = '$2';
EOF
}

# truncate all public tables
sqlta() {
  _psql_run -x <<'EOF'
DO
$$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE;';
    END LOOP;
END
$$;
EOF
}

# drop and recreate public schema
sqlda() {
  _psql_run <<'EOF'
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
EOF

  [[ "$?" -eq 0 ]] &&
    echo "✅ Database schema reset complete." ||
    echo "💥 Failed to reset schema."
}