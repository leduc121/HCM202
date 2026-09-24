# Tư tưởng Hồ Chí Minh

A Vietnamese digital exhibition built with Next.js 16, TypeScript, Tailwind CSS 4, GSAP and Lucide. The design follows the supplied documentary reference: full-bleed monochrome photography, a centered editorial masthead, bold sans-serif headlines, warm off-white reading sections and a dark media archive. Academic copy remains explicitly provisional.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run lint` and `npm run build` before publishing.

## Replace content

All content is in `src/data/`. Components are in `src/components/`; the server-rendered exhibition is composed in `app/page.tsx`. Layout tokens, section compositions and responsive rules are in `app/globals.css`.

| File            | Content                                                                   |
| --------------- | ------------------------------------------------------------------------- |
| `types.ts`      | Shared TypeScript interfaces                                              |
| `site.ts`       | Project metadata, section copy, navigation, foundations and shared images |
| `timeline.ts`   | Years, locations, descriptions, optional images and sources               |
| `chapters.ts`   | Chapter summaries, full paragraphs and reference IDs                      |
| `quotes.ts`     | Quote text, attribution, context, year and source                         |
| `gallery.ts`    | Curated images, dates, types and inspection captions                      |
| `concepts.ts`   | Definitions, relationships and chapter connections                        |
| `quiz.ts`       | Questions, choices, zero-based correct-answer index and explanations      |
| `references.ts` | Bibliographic metadata and optional URLs                                  |
| `team.ts`       | Names, student IDs, roles and contributions                               |

Keep IDs stable because chapter and reference links use them. The gallery derives filters from its data. To add a chapter, add one data object. To add a timeline image, provide an `ArchiveImage` object in its optional `image` field. Do not assign a historical image to a different date as if it documented that event.

The quote currently shown is an explicitly identified exhibition editorial line, not a quotation by Hồ Chí Minh. Timeline descriptions are demonstrative, not verified historical claims. The quiz tests source-reading methods; replace it with approved course questions when ready. The supplied Google document was not accessible during implementation, so its contents have not been imported.

## Images and fonts

`public/images/` has dedicated directories for hero, timeline, archive, chapters, portraits, documents and team assets. Every `ArchiveImage` supports alt text, caption, date, source and an optional source URL. `illustrative: true` visibly labels illustrative assets.

- `hero/ho-chi-minh.jpg`: Wikimedia Commons portrait, unknown photographer. [Source and license](https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_-_1946_Portrait.jpg). Commons marks it public domain. The filename says 1946, while the description says circa 1947; the interface follows the description and explains the discrepancy in image inspection.
- `hero/france-1946.webp`: Hồ Chí Minh with Vietnamese expatriates in France, 1946, according to the Commons description. See `public/images/ASSETS.md` for source and license.
- `archive/meeting-1946.webp`: Hồ Chí Minh, Leclerc and Sainteny, 18 March 1946, according to the Commons description. Source and attribution are in the gallery and image manifest.
- `archive/reading-table.webp`: AI-generated contemporary illustration, not historical evidence. Generated using the built-in image generation tool, then compressed to WebP for this site. Prompt recorded in `public/images/ASSETS.md`.
- Fonts: locally hosted Be Vietnam Pro and Playfair Display from Google Fonts. Both include Vietnamese glyphs. Local font loading keeps builds independent of Google Fonts availability.

## Interaction and accessibility

Desktop timeline: GSAP-pinned cinematic sequence, scroll-driven year/image progression, year selection and previous/next controls. Tablet/mobile: vertical native disclosures. Reduced-motion desktop: manual year selection without pinning. Chapters: native disclosures with stable deep-link anchors. Gallery: native modal dialog with Escape, focus containment, scroll locking and focus restoration. Quiz: one answer per question, explanation, progress, score and restart.

GSAP animations live in a client leaf with context cleanup. The brief's alternating paper/ink exhibition palette intentionally overrides the skill's default single-theme preference. Reduced motion disables the intro and animated effects. The brief's document numbers, metadata and scroll cue are intentional. The opening replays on every page load and refresh, with no storage or cookies. Its 3.1-second title sequence uses masked titles, a portrait reveal, a red rule and an upward wipe into the hero. Reduced-motion users skip it. A CSS fallback dismisses the visual overlay if script execution fails. Navigation and content remain usable without animation; chapter disclosures also work without JavaScript.

No analytics, tracking, accounts or external runtime image requests are included.

## Documentary redesign verification

- ESLint and TypeScript checks pass.
- Production build verified with `npm run build -- --webpack`. This environment blocks an internal Turbopack process from binding a port; webpack completes successfully without changing the project’s default bundler setting.
- Browser interactions checked: foundation selection, timeline limits, chapter expansion, gallery filtering and Escape/focus restoration, concept-to-chapter links, quiz scoring/restart, mobile navigation and vertical timeline disclosures.
- No horizontal overflow at 360, 390, 768, 820, 1024, 1280 and 1440px.
- Reduced-motion browser audit: no detected WCAG 2 A/AA or WCAG 2.1 AA violations after contrast corrections. Automated checks do not replace a full manual accessibility assessment.

- Browser verification also confirms intro replay on refresh, automatic timeline progression while pinned, and removal of pinning when reduced motion is enabled.
