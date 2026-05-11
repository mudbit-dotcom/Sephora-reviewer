import { base } from '$app/paths';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  SEPHORA_FALLBACK_FILENAME,
  SEPHORA_PLACEHOLDER_IMAGE,
} from '$lib/data/sephora-image.js';

function photoUrl(filename) {
  return `${base}/photos/${filename}`;
}

function photoExists(filename) {
  return existsSync(resolve('static/photos', filename));
}

export function getSephoraImageSrc(sephora) {
  const candidates = [
    sephora.photo?.trim(),
    `sephora-${sephora.rank}.jpg`,
    SEPHORA_FALLBACK_FILENAME,
  ];

  for (const filename of candidates) {
    if (filename && photoExists(filename)) {
      return photoUrl(filename);
    }
  }

  return SEPHORA_PLACEHOLDER_IMAGE;
}

export function withSephoraImageSrc(sephora) {
  return {
    ...sephora,
    imageSrc: getSephoraImageSrc(sephora),
  };
}
