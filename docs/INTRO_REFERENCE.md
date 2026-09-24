# Shopify Design intro reference

## Scope
Observed the public Shopify Design landing page at 1440×900 (screen recording and live page). This document records motion language only; no Shopify logo, copy, assets, or source are reused.

## Storyboard
1. **0–700ms — white canvas:** navigation and content are present but visually quiet; white background dominates. The headline is the primary object, centered and oversized.
2. **700–1500ms — typographic lockup:** two-line sans-serif headline (“Make the / new normal”) sits on a tight baseline with minimal subtitle below. No spinner or progress bar.
3. **1500–2400ms — spatial disruption:** headline briefly separates into offset regions while white rectangular tiles enter from viewport edges. Tiles mask portions of text and reveal the visual field behind it.
4. **2400–3000ms — mosaic peak:** multiple rectangular masks overlap in a stepped composition; a restrained blue/violet accent appears in the exposed artwork.
5. **3000ms+ — settle:** tiles clear, typography returns crisp, and the page continues into the dark/visual content area.

## Approximate timeline
| Time | Element | Motion |
|---|---|---|
| 0–400ms | background | white, static |
| 400–1200ms | headline | opacity 0→1, translateY ~24px→0, ease-out |
| 1200–1800ms | subtitle | fade/translateY ~12px→0 |
| 1800–2400ms | tile masks | clip/translate from edges, stagger 30–70ms |
| 2400–2800ms | mosaic peak | short stepped hold, no bounce |
| 2800–3200ms | transition | masks clear, content settles |

Values are visual estimates from the reference recording; Shopify’s implementation is not inspected or copied.

## Layout and type
- White full-viewport canvas, centered editorial composition.
- Very large bold geometric sans, tight line-height (~0.82–0.9em), dark near-black text.
- Subtitle is small, regular sans, centered below.
- Rectangular tiles are square/portrait/landscape mixes, with hard edges and no rounded corners.
- Accent is used sparingly in exposed artwork (blue/violet/pink), never as a permanent gradient background.

## Responsive behavior
Desktop keeps the headline wide and centered. Tablet reduces type scale and tile count. Mobile stacks the lockup, keeps generous side padding, and uses fewer/larger tiles to avoid overflow. Intro should lock scroll while active and release it on completion or skip.

## SO-101 conversion
Use `CONTROL THE / IMPOSSIBLE.` and `Precision control for intelligent robotic systems.` on the white canvas. Replace the reference’s visual artwork with abstract technical tiles in SO-101 electric blue/violet and black/white. The final tile clear transitions to the existing dark dashboard. Intro is implemented with HTML text, GSAP timeline, fixed deterministic tile positions, Escape/Skip controls, and reduced-motion fallback.

## Components
`ExhibitionMotion` currently owns the intro and global GSAP setup. The intro markup is isolated under `.opening`; future extraction target is `RobotIntro.tsx`.

## Metaball audit and visual gate

The previous implementation was CSS `border-radius` plus radial gradients and inset shadows. It failed the reference on shape (flat circles), material (no continuous surface), lighting (single fake gradient), depth (no foreground/background separation), motion (uniform float), and transition (hard scaling). It therefore looked like decorative bubbles.

The isolated prototype is available at `/metaball-lab`. It uses a WebGL fragment shader with sphere SDF distance fields, normal estimation, diffuse/specular/rim lighting, and fixed composition data. It is intentionally not integrated into the intro until a screenshot review confirms the frame quality.
