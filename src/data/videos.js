/**
 * src/data/videos.js
 * ─────────────────────────────────────────────
 * Single source of truth for all video metadata.
 * All paths are relative to /public — Vite serves public/ at root.
 * ─────────────────────────────────────────────
 */

/** 6 vertical (9:16) reels for the grid */
export const verticalVideos = [
  {
    id:          'v1',
    title:       "JKLU Aarambh '26",
    client:      'JK Lakshmipat University',
    category:    'Event',
    orientation: 'vertical',          // 9:16
    src:         '/assets/video-29285.mp4',
    poster:      null,
    tools:       ['DaVinci Resolve'],
    year:        2026,
  },
  {
    id:          'v2',
    title:       'Keshuji Sweets POV',
    client:      'Keshuji Sweets',
    category:    'Food',
    orientation: 'vertical',
    src:         '/assets/keshuji-sweets-pov.mp4',
    poster:      null,
    tools:       ['DaVinci Resolve'],
    year:        2026,
  },
  {
    id:          'v3',
    title:       'AreyPuneet — CBSE Roadmap',
    client:      'AreyPuneet',
    category:    'Creator',
    orientation: 'vertical',
    src:         '/assets/puneet-sir-cbse-vd.mp4',
    poster:      null,
    tools:       ['DaVinci Resolve'],
    year:        2026,
  },
  {
    id:          'v4',
    title:       "Parichay '26 — Ramp Walk",
    client:      "Parichay '26",
    category:    'Fashion / Event',
    orientation: 'vertical',
    src:         '/assets/parichay26-rampwalk.mp4',
    poster:      null,
    tools:       ['DaVinci Resolve'],
    year:        2026,
  },
  {
    id:          'v5',
    title:       'AreyPuneet — Exam Mindset',
    client:      'AreyPuneet',
    category:    'Creator',
    orientation: 'vertical',
    src:         '/assets/video-73645.mp4',
    poster:      null,
    tools:       ['DaVinci Resolve'],
    year:        2026,
  },
  {
    id:          'v6',
    title:       "Bappa's Aagman #1",
    client:      'Cultural / Utsav Committee',
    category:    'Event',
    orientation: 'vertical',
    src:         '/assets/bappas-aagman-1.mp4',
    poster:      null,
    tools:       ['DaVinci Resolve'],
    year:        2026,
  },
];

/** All videos flat (useful for lightbox prev/next) */
export const allVideos = [...verticalVideos];
