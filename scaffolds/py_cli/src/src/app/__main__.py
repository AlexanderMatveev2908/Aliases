import sys


def main() -> None:
    print("script worked")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\t")
        print("✌🏼 bye")
        sys.exit(0)
