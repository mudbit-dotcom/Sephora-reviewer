export const SEPHORA_FALLBACK_FILENAME = 'sephora-1.jpg';

export const SEPHORA_PLACEHOLDER_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="Photo unavailable">
    <rect width="1200" height="800" fill="#f6efe8" />
    <rect x="80" y="80" width="1040" height="640" rx="36" fill="#ffffff" stroke="#e6d4c5" stroke-width="10" />
    <circle cx="250" cy="250" r="96" fill="#c8102e" opacity="0.14" />
    <circle cx="950" cy="530" r="128" fill="#c8102e" opacity="0.1" />
    <text x="600" y="390" text-anchor="middle" fill="#8b5e4c" font-family="Georgia, 'Times New Roman', serif" font-size="56" font-weight="700">Photo unavailable</text>
    <text x="600" y="465" text-anchor="middle" fill="#a37d6b" font-family="Arial, Helvetica, sans-serif" font-size="28">Add a JPEG to static/photos to replace this placeholder</text>
  </svg>
`).trim()}`;
