# Daksh Arya — Portfolio

A static, no-build personal portfolio. Plain HTML, CSS and JavaScript — open it,
edit one content file, deploy anywhere.

```
portfolio/
├── index.html              page structure (sections, nav, footer)
├── assets/
│   ├── js/content.js       ← ALL text, projects, links and images live here
│   ├── js/main.js          renders content.js + interactions
│   ├── css/style.css       design tokens and styles
│   ├── fonts/              DM Sans (self-hosted, SIL Open Font License)
│   └── images/             put your photos here
└── README.md
```

## Preview locally

The site works by double-clicking `index.html`, but a local server behaves
exactly like production:

```bash
cd portfolio
python3 -m http.server 8000     # then open http://localhost:8000
```

## Editing content

Everything lives in `assets/js/content.js`, split by content type:

| Key                   | What it holds                                    |
| --------------------- | ------------------------------------------------ |
| `profile`             | name, hero lines, intro, "Right now"             |
| `contact`             | email, LinkedIn, GitHub                          |
| `projects`            | featured projects (order = order on the page)    |
| `hackathonProjects`   | hackathon builds (expandable entries)            |
| `workbench`           | small experiments                                |
| `about`, `skills`     | the About section and "Tools I reach for"        |
| `experience`          | jobs, research, internships                      |
| `immersionProgrammes` | immersion programmes (kept separate on purpose)  |
| `leadership`          | "The people side of things"                      |
| `certifications`      | 3–6 certifications with credential links         |

Search the file for `TODO` to find every placeholder that still needs your details.

### Adding photos

1. Drop the file into `assets/images/` (e.g. `heatguard-hero.jpg`).
2. In `content.js`, set that media item's `src`:
   ```js
   { src: "assets/images/heatguard-hero.jpg", label: "[HeatGuard Hero Image]", caption: "Wearable prototype", ratio: "16/8" }
   ```
3. Match `ratio` to the photo (`"16/9"`, `"4/3"`, `"4/5"`, `"1/1"` …).
   Videos work too: `src: "assets/images/demo.mp4"` (autoplays, muted, looped).

Until a project's first image has a `src`, it's shown as a typographic poster in
that project's colours (`poster` and `color` on each project).

Tip: export photos at ~2000px on the long edge, as `.jpg` (quality ~80) or `.webp`.

### Adding a project

Copy an existing object in `projects`, change the `id`, text and media, and pick
a gallery `layout`:

- `feature` — full-width hero + supporting row
- `split` — two-column, staggered
- `stack` — large image + two stacked
- `carousel` — swipe/drag carousel
- `floating` — full-width screenshot with a floating metadata card

`results` items with a `value` show as big numbers; omit `value` for awards.

## Deploying

Any static host works — upload the `portfolio/` folder as-is.

- **GitHub Pages:** push the repo, then Settings → Pages → deploy from branch,
  folder `/portfolio` (or move these files into a dedicated repo root).
- **Netlify / Vercel / Cloudflare Pages:** set the publish directory to `portfolio`, with no build command.

## Design notes

- Type: DM Sans — heavy, tightly tracked headings; small, widely tracked uppercase labels.
- Alternating dark / light bands; the nav switches theme to match the band beneath it.
- One accent colour (`--accent` in `style.css`) used for the square full stop,
  the live dot and focus states.
- Interactions: line-by-line hero reveal, scroll reveals, custom cursor (mouse
  only), lightbox, carousel, expandable stories, workbench hover preview, scroll
  progress and back-to-top. All motion respects `prefers-reduced-motion`.
