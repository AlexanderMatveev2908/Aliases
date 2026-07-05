from re import Pattern
import re

import emoji


class Reg:
    __emj: Pattern[str] = re.compile(
        r"^\s*[" + ("".join(emoji.EMOJI_DATA.keys())) + r"]"
    )

    @classmethod
    def starts_with_emj(cls: type["Reg"], txt: str) -> bool:
        return cls.__emj.match(txt) is not None
