import sephoras from '$lib/data/nyc-sephoras.json';
import { withSephoraImageSrc } from '$lib/server/sephora-images.js';


export function load() {
  return {
    sephoras: {
      ...sephoras,
      locations: (sephoras.locations ?? []).map(withSephoraImageSrc),
    },
    showHeader: false,
    showFooter: false,
  };
}