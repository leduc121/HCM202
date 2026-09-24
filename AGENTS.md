<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Frontend tooling
- Read and use `design-taste-frontend` for frontend/redesign work; use `redesign-existing-projects` for existing-site upgrades.
- Use `image-to-code` when working from screenshots or visual references.
- Use GSAP for intro timelines, ScrollTrigger, pinned sections, parallax and precise sequences; use Motion for component state, modals, menus and layout transitions. Never let both libraries animate the same property on one element.
- Before redesigning from a URL, inspect it with Playwright at desktop and mobile, including reload, hover, scroll and screenshots; compare local and reference at the same viewport.
- Do not copy proprietary branding, text, imagery or source code. Support responsive layouts and `prefers-reduced-motion`.
