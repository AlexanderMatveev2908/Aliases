# 🕹️ PYTHON CLI ROCK-PAPER-SCISSORS

## 📌 About This Project

A Python CLI rock-paper-scissors game built as learning project following the [BeCoder](https://becoder.ro/en) requirements.

---

## 🧱 Tech Stack

- **Python (>=3.12,<3.14)** — main programming language used to build the CLI application.
- **Poetry** — dependency manager and project builder for Python.
- **mypy** – static type checker ensuring type safety and code correctness.
- **ruff** – Python linter for maintaining clean and consistent code style.

---

## 📦 Setup

### 🔋 Installation

To install project dependencies run:

```bash
poetry install
```

This will automatically create a virtual environment and install all dependencies defined in [pyproject.toml](pyproject.toml)

---

### 🛠️ Build

To build the Python package, use:

```bash
poetry build
```

This command generates two distribution files inside the `dist/` folder:

- **Wheel (`.whl`)** — a prebuilt installable package
- **Source tarball (`.tar.gz`)** — a gzipped archive of your source code

---

### 🔧 Wheel Installation

To install the built wheel into your **local Poetry environment** (not globally or in the system environment):

```bash
poetry run pip install dist/app-1.0.0-py3-none-any.whl
```

After that if you run:

```bash
poetry run pip list
```

In the output you will see between packages:

```bash
Package           Version
----------------- -------
app               1.0.0 <- ✅ installed right now
mypy              1.18.2
ruff              0.14.4
...rest of packages
```

### 🕹️ Run the app

To run the installed app now you can run:

```bash
poetry run python -m app
```

---

## ✏️ Final Notes

I hope you find the project interesting — if not, the app doesn’t come with a refund policy 💰

Thanks for checking out the repo ✌🏼
