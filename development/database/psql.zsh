# ----------------------------
# Build connection URL from .env
# ----------------------------
_load_env() {
  set -a
  source .env
  set +a
}

_psql_run() {
  _load_env

  PGPASSWORD="$DB_PWD" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_DATABASE" \
    "$@"
}

# Commands
# ----------------------------

# open interactive shell
sql() {
  _psql_run
}

# query full table
sqlq() {
  [[ -z "$1" ]] && { echo "⚠️ Usage: sqlq <table>"; return 1; }
  _psql_run <<EOF
\x
SELECT * FROM "$1";
EOF
}

# list enum values
sqlqe() {
  [[ -z "$1" ]] && { echo "⚠️ Usage: sqlqe <enum_type>"; return 1; }
  _psql_run <<EOF
\x
SELECT enumlabel
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = '$1'
ORDER BY enumsortorder;
EOF
}

# delete by id
sqld() {
  if [[ -z "$1" || -z "$2" ]]; then
    echo "⚠️ Usage: sqld <table> <id>"
    return 1
  fi
  _psql_run -x <<EOF
DELETE FROM "$1" WHERE id = '$2';
EOF
}

# truncate one table
sqlt() {
  [[ -z "$1" ]] && { echo "⚠️ Usage: sqlt <table>"; return 1; }
  _psql_run -x -c "TRUNCATE TABLE $1 CASCADE;"
}

# truncate all tables
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

sqlda() {
  echo "⚠️  WARNING: This will DELETE all tables and data in this database."
  read "reply?Are you sure you want to continue? (y/N) "

  [[ "$reply" =~ ^[Yy]$ ]] || {
    echo "❌ Operation cancelled."
    return 1
  }

  _psql_run -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;' &&
    echo '✅ Database schema reset complete.' ||
    echo '💥 Failed to reset schema.'
}