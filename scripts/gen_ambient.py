#!/usr/bin/env python3
"""
Generates the portfolio's ambient background loop.

Everything is periodic in the loop time, so the clip repeats without a visible
seam: every term advances by a whole number of cycles per loop.

Render -> 960x540 float field -> Lanczos upscale to 1920x1080 -> ffmpeg (mp4 + webm)
"""
import math
import os
import subprocess
import sys

import numpy as np
from PIL import Image

W, H = 960, 540
OW, OH = 1600, 900
FPS = 24
SECONDS = 10
N = FPS * SECONDS
OUT = sys.argv[1] if len(sys.argv) > 1 else "/data/kojo/out"

x = np.linspace(0.0, 1.0, W, dtype=np.float32)
y = np.linspace(0.0, 1.0, H, dtype=np.float32)
X, Y = np.meshgrid(x, y)
ASP = W / H
PX = (X - 0.5) * ASP
PY = (Y - 0.5)

TERMS_A = [
    (2.1, 1.4, 1, 0.55, 0.0),
    (-1.3, 2.7, 1, 0.42, 1.7),
    (3.4, -2.2, 2, 0.26, 3.1),
    (-4.6, 1.1, 2, 0.17, 5.4),
    (1.7, 3.9, 3, 0.12, 2.2),
    (6.1, 4.3, 3, 0.07, 4.7),
]

TERMS_B = [
    (1.2, 2.1, 1, 0.50, 2.6),
    (-2.6, -1.5, 1, 0.36, 0.9),
    (3.1, 3.3, 2, 0.20, 4.2),
    (5.4, -1.2, 2, 0.11, 1.4),
]


def wave(px, py, terms, t):
    ph = 2.0 * math.pi * t
    out = np.zeros_like(px)
    for kx, ky, m, amp, p in terms:
        out += amp * np.sin(kx * px + ky * py + m * ph + p)
    return out


def smoothstep(a, b, v):
    t = np.clip((v - a) / (b - a), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def frame(t):
    a = wave(PX, PY, TERMS_A, t)
    b = wave(PX * 1.15 + 0.35 * np.sin(a * 1.1), PY * 1.3, TERMS_B, t)
    field = a + 0.45 * b

    def contours(freq, width):
        d = np.abs(np.mod(field * freq + t, 1.0) - 0.5)
        return smoothstep(width, 0.0, d)

    major = contours(2.1, 0.030)
    minor = contours(6.3, 0.012)

    # light gathering in the high ground of the field
    lift = smoothstep(-1.2, 1.15, field)
    glow = lift ** 2.2

    # slow cast of light across the plate
    cast_x = 0.42 + 0.26 * math.sin(2 * math.pi * t + 0.4)
    cast = np.exp(-(((PX - (cast_x - 0.5) * ASP) * 1.15) ** 2 + (PY + 0.12) ** 2 * 2.2) * 2.0)

    mixv = np.clip(0.30 + 0.55 * (0.5 + PY) + 0.35 * (a - b) * 0.5, 0.0, 1.0)
    mint = np.array([0.133, 0.898, 0.627], dtype=np.float32)
    aqua = np.array([0.157, 0.831, 0.980], dtype=np.float32)
    col = mint[None, None, :] * (1 - mixv)[..., None] + aqua[None, None, :] * mixv[..., None]

    intensity = (
        0.010
        + glow * 0.16
        + cast * 0.10
        + major * (0.30 + 0.34 * glow)
        + minor * 0.10
    )

    # plate light: bright toward the upper middle, black in the corners
    r = np.sqrt((PX * 0.62) ** 2 + ((PY + 0.08) * 0.95) ** 2)
    vig = smoothstep(0.98, 0.10, r)
    intensity = intensity * (0.30 + 0.70 * vig)
    intensity = intensity * (0.55 + 0.45 * smoothstep(1.05, 0.25, Y))

    rgb = col * intensity[..., None]
    rgb += np.array([0.80, 1.0, 0.94], np.float32) * (major * glow)[..., None] * 0.42
    rgb += np.array([0.010, 0.014, 0.020], np.float32)

    rgb = np.clip(rgb, 0.0, 1.0) ** 1.0
    return (rgb * 255.0).astype(np.uint8)


def encode():
    os.makedirs(OUT, exist_ok=True)

    picks = [frame(0.0), frame(0.33), frame(0.66)]
    sheet = Image.new("RGB", (W, H * 3))
    for i, f in enumerate(picks):
        sheet.paste(Image.fromarray(f, "RGB"), (0, H * i))
    sheet.save(f"{OUT}/preview-sheet.jpg", quality=84)

    poster = Image.fromarray(frame(0.12), "RGB").resize((OW, OH), Image.LANCZOS)
    poster.save(f"{OUT}/ambient-poster.jpg", quality=86, optimize=True)

    common = [
        "ffmpeg",
        "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{OW}x{OH}", "-r", str(FPS), "-i", "-",
        "-an",
    ]
    cmds = [
        common
        + [
            "-c:v", "libx264", "-preset", "slow", "-crf", "26",
            "-x264-params", "keyint=48:min-keyint=24",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", f"{OUT}/ambient.mp4",
        ],
        common
        + [
            "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0",
            "-row-mt", "1", "-cpu-used", "2", "-pix_fmt", "yuv420p", f"{OUT}/ambient.webm",
        ],
    ]

    procs = [subprocess.Popen(c, stdin=subprocess.PIPE) for c in cmds]

    for i in range(N):
        small = frame(i / N)
        img = Image.fromarray(small, "RGB").resize((OW, OH), Image.LANCZOS)
        data = img.tobytes()
        for p in procs:
            p.stdin.write(data)
        if i % 24 == 0:
            print(f"frame {i}/{N}", flush=True)

    for p in procs:
        p.stdin.close()
    for p in procs:
        p.wait()

    for f in ("ambient.mp4", "ambient.webm", "ambient-poster.jpg", "preview-sheet.jpg"):
        size = os.path.getsize(f"{OUT}/{f}")
        print(f"{f}: {size/1024/1024:.2f} MB")


if __name__ == "__main__":
    encode()
