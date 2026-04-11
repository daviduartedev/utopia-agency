"""One-off: white-on-black PNG -> white-on-transparent (favicon / logo mark)."""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def key_black_to_white_transparent(
    src: Path,
    dst: Path,
    *,
    black_cutoff: int = 22,
) -> None:
    im = Image.open(src).convert("RGBA")
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    src_px = im.load()
    out_px = out.load()
    w, h = im.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = src_px[x, y]
            mx = max(r, g, b)
            if mx < black_cutoff:
                continue
            # Monochrome white strokes; alpha follows edge antialias from black matting.
            alpha = min(255, int(mx * a / 255)) if a < 255 else mx
            out_px[x, y] = (255, 255, 255, alpha)

    out.save(dst, format="PNG", optimize=True)


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: key-black-to-transparent.py <src.png> <dst.png>", file=sys.stderr)
        return 2
    key_black_to_white_transparent(Path(sys.argv[1]), Path(sys.argv[2]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
