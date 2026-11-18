# kojo-portfolio

Personal portfolio for **Kojo** — developer tools, interfaces and motion.

Live: **https://kojo-portfolio.pages.dev** (Cloudflare Pages, direct upload)

## Stack

- **Vite 7** + **React 19** + **TypeScript**
- **Tailwind CSS 4** (design tokens in `src/index.css` under `@theme`)
- **Framer Motion** for reveals, the mobile sheet and the copy feedback
- **Custom WebGL2 shader** (`src/components/ShaderField.tsx`) — a noise field with
  contour bands that reacts to the pointer. No three.js, ~3 KB of code.
- **Self-hosted fonts** via `@fontsource`: Space Grotesk, Inter, JetBrains Mono.
- One locally generated ambient video (`public/media/ambient.mp4` + `.webm` + poster),
  rendered with numpy/ffmpeg. No external media host, nothing to break.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview
```

Node 20+ recommended (built on Node 22).

## Editing content

Everything textual lives in **`src/data/projects.ts`**:

- `profile` — name, email, GitHub, X, location, availability.
- `featured` — the RunLedger block (tagline, description, feature cards, links).
- `projects` — the card grid. The three entries currently marked `concept: true`
  are **mockups**: believable product cards standing in for work in progress. To
  swap one for a real project, edit its fields and set `concept: false`; the
  discreet "concept build" tag disappears. No component needs touching.
- `approach` and `toolbox` — the "how I build" cards and the marquee.

Preview art for the cards is procedural (`src/components/Previews.tsx`): an
animated workflow graph, an analytics chart and a deploy log, all SVG/CSS so
they stay crisp and weightless.

## Structure

```
src/
  App.tsx                 page assembly
  index.css               theme tokens, base styles, utilities, keyframes
  data/projects.ts        all site content
  components/
    Nav, Hero, FactStrip, Marquee, Featured, Projects, Approach, Contact, Footer
    ShaderField.tsx       WebGL2 background
    AmbientVideo.tsx      background video with poster + reduced-motion fallback
    Previews.tsx          project card previews
    CursorGlow.tsx, ScrollProgress.tsx
    ui/                   Reveal, SectionLabel, TiltCard
public/
  media/                  ambient.mp4 / .webm / poster (generated, see below)
  og.jpg, favicon.svg
```

## Accessibility & performance

- `prefers-reduced-motion` disables the marquee, the shader animation, video
  playback, tilt and all reveal transitions.
- The shader pauses when it leaves the viewport or the tab is hidden, and caps
  device pixel ratio at 1.6 (1.15 on small screens).
- Skip link, focus-visible rings, aria labels on icon-only controls, semantic
  landmarks.

## Regenerating the ambient video

The clip is procedural and loops seamlessly (every noise term completes a whole
number of cycles per loop):

```bash
python3 scripts/gen_ambient.py <out-dir>   # needs numpy, pillow and ffmpeg
```

It writes `ambient.mp4` (H.264, 1080p, 12 s), `ambient.webm` (VP9) and the
poster frame used for first paint.

## Deploy

Cloudflare Pages, static build:

- Build command: `npm run build`
- Output directory: `dist`
