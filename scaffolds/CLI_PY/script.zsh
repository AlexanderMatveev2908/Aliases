pyc(){
  echo "🔍 running code checks..."

  poetry run ruff check src && echo "✅ lint check passed" && \
  poetry run mypy src && echo "✅ types check passed" && \
  echo "🎉 all checks passed"
}

py(){
  cp -r /home/ninja/.config/zsh/aliases/scaffolds/CLI_PY/src/{*,.*} ./ > /dev/null

  poetry add -D mypy ruff types-regex
  poetry add emoji regex

  echo "🐍 Python CLI ready 🎉"
}