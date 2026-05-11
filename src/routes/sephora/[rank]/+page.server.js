import { error } from '@sveltejs/kit';
import sephoras from '$lib/data/nyc-sephoras.json';
import { withSephoraImageSrc } from '$lib/server/sephora-images.js';

export function load({ params }) {
  const rank = Number(params.rank);

  if (!Number.isInteger(rank)) {
    throw error(404, 'Location not found');
  }

  const sephora = sephoras.locations.find((location) => location.rank === rank);

  if (!sephora) {
    throw error(404, 'Location not found');
  }

  return {
    sephora: withSephoraImageSrc(sephora),
  };
}
