import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import sephoras from '$lib/data/nyc-sephoras.json';

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
    sephora: {
      ...sephora,
      imageSrc: rank === 1 ? `${base}/photos/sephora-1.jpg` : '',
    },
  };
}
