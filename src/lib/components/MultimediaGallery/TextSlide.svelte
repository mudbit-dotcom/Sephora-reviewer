<!--
@component
TextSlide.svelte — A centered text slide for narrative context between photos.

Displays a headline and body paragraph on a full-screen black background,
providing editorial context within a multimedia gallery sequence.

USAGE EXAMPLE:
<TextSlide slide={{
  headline: 'The Commute',
  body: 'Every day, thousands of riders depend on the L train to cross between Brooklyn and Manhattan.'
}} />
-->
<script>
  import { onMount, setContext } from 'svelte';

  let {
    slide, // Object with headline and body text
    children,
  } = $props();

  let slideEl;
  let isVisible = $state(false);

  const _visibilityListeners = [];

  // onVisible allows child components to register a callback that will be
  // invoked when the slide becomes visible. Callers may pass an `opts`
  // object with timing parameters `{ delay, duration }`; the slide will
  // honor `delay` by scheduling the callback after that many milliseconds.
  function onVisible(cb, opts = {}) {
    if (isVisible) {
      if (opts && typeof opts.delay === 'number' && opts.delay > 0) {
        const t = setTimeout(() => cb(opts), opts.delay);
        return () => clearTimeout(t);
      }
      cb(opts);
      return () => {};
    }
    _visibilityListeners.push({ cb, opts });
    return () => {
      const idx = _visibilityListeners.findIndex((l) => l.cb === cb && l.opts === opts);
      if (idx >= 0) _visibilityListeners.splice(idx, 1);
    };
  }

  setContext('multimedia-slide-visible', {
    isVisible: () => isVisible,
    onVisible,
  });

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
      if (entry?.isIntersecting) {
          isVisible = true;
          // notify any listeners registered by child components
          for (const { cb, opts } of _visibilityListeners.slice()) {
            if (opts && typeof opts.delay === 'number' && opts.delay > 0) {
              setTimeout(() => cb(opts), opts.delay);
            } else {
              cb(opts);
            }
          }
          _visibilityListeners.length = 0;
          observer.disconnect();
        }
      },
      {
        threshold: 0.45,
      }
    );

    if (slideEl) observer.observe(slideEl);

    return () => observer.disconnect();
  });
</script>

<div class="slide" bind:this={slideEl} data-slide>
  <div class="content">
    <h2>{slide.headline}</h2>
    <p>{@html slide.body}</p>
    {#if children}
      <div class="children">
        {@render children()}
      </div>
    {/if}
  </div>
</div>

<style>
  .slide {
    min-height: 80dvh;
    height: auto;
    flex: 0 0 100%;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg) 0;
  }

  .content {
    width: min(100%, 900px);
    padding: 1.5rem 2rem;
    color: white;
    text-align: center;
  }

  h2 {
    font-size: 1.75rem;
    line-height: 1.2;
    margin: 0 0 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: white;
  }

  p {
    font-size: 1.0625rem;
    line-height: 1.7;
    opacity: 0.8;
    margin: 0;
  }

  .children {
    margin-top: 1.25rem;
    width: 100%;
  }

 :global(.highlight) {
  color: red;
}
</style>
