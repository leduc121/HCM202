#!/usr/bin/env python3
"""Local server for the archived Podium website.

The archive contains a static Next.js export.  Its image URLs still point to
Next's `/_next/image` route, so a plain file server cannot display the saved
DatoCMS images.  This server resolves those requests to the mirrored files.
"""

from __future__ import annotations

import argparse
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse


ROOT = Path(__file__).resolve().parent
SITE = ROOT / "podium.global"
DATOCMS = ROOT / "www.datocms-assets.com"


class ArchiveHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        parsed = urlparse(path)
        if parsed.path == "/_next/image":
            source = parse_qs(parsed.query).get("url", [""])[0]
            image_url = urlparse(unquote(source))
            if image_url.hostname == "www.datocms-assets.com":
                return str(DATOCMS / image_url.path.lstrip("/"))

        relative = parsed.path.lstrip("/")
        # The saved project pages retain their .html suffix, while the live
        # site links to them without it.
        candidate = SITE / relative
        if not candidate.exists() and not Path(relative).suffix:
            candidate = SITE / f"{relative}.html"
        return str(candidate)

    def log_message(self, format: str, *args: object) -> None:
        print(format % args)


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the archived Podium website")
    parser.add_argument("--port", type=int, default=4173)
    args = parser.parse_args()
    os.chdir(SITE)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), ArchiveHandler)
    print(f"Podium archive: http://127.0.0.1:{args.port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
