// Page settings
// These values are passed to the layout to control what appears on the page.
import sephoras from '$lib/data/nyc-sephoras.json';

export function load() {
  return {
    showHeader: true,
    showFooter: true,
    sephoras,
  };
}
