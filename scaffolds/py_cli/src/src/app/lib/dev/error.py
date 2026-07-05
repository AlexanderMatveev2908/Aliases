import json
from typing import Type

from app.paperwork.reg import Reg
from app.paperwork.types import Nullable


class ErrApp(Exception):
    msg: str
    code: int

    def __init__(self: "ErrApp", msg: str, code: Nullable[int] = None) -> None:
        super().__init__(msg)
        self.msg = f"❌ {msg}"
        self.code = code or 500

    @classmethod
    def err_log(cls: Type["ErrApp"], msg: str) -> None:
        emj: str = "" if Reg.starts_with_emj(msg) else "❌ "

        print(f"{emj}{msg}")

    @classmethod
    def err_ex(cls: Type["ErrApp"], msg: str) -> None:
        cls.err_log(msg)
        exit(1)

    def __str__(self: "ErrApp") -> str:
        return json.dumps(self.__dict__, indent=2, ensure_ascii=False)

    def __eq__(self: "ErrApp", other: object) -> bool:
        if not isinstance(other, ErrApp):
            return NotImplemented

        return self.__dict__ == other.__dict__
