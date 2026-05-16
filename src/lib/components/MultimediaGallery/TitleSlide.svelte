<!--
@component
TitleSlide.svelte — The opening slide of a multimedia gallery.

Displays a centered headline, introductory text, byline, and a
"Scroll to begin" hint on a full-screen black background.

USAGE EXAMPLE:
<TitleSlide
  headline="Life on the L Train"
  intro="A photo essay documenting commuters on New York's busiest crosstown line."
  byline="By Jane Doe"
/>
-->
<script>
  let {
    headline, // The main gallery title
    intro, // Introductory text below the headline
    byline, // Author attribution
  } = $props();
</script>

<div class="slide" data-slide>
  <div class="content">
    <h1>{headline}</h1>
    <p class="intro">{intro}</p>
    <p class="byline">{byline}</p>
  </div>
  <div class="scroll-hint">Scroll to begin ↓</div>
</div>

<style lang="scss">
  @use '../../styles' as *;

  .slide {
    height: 100%;
    flex: 0 0 100%;
    background: black;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 5rem;
    color: white;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    line-height: 1.2;
    margin: 0 0 1rem;
    color: white;

    @container (min-width: 768px) {
      font-size: 3.5rem;
    }
  }

  .intro {
    font-size: 1.0625rem;
    line-height: 1.6;
    opacity: 0.85;
    margin: 0 0 1.5rem;

    @container (min-width: 768px) {
      font-size: 1.375rem;
      line-height: 1.7;
    }
  }

  .byline {
    font-size: 0.875rem;
    opacity: 0.6;
    margin: 0;

    @container (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  .scroll-hint {
    font-size: 0.8125rem;
    opacity: 0.6;
    margin: 0;
    padding-bottom: 3.5rem;
    color: white;
    display: flex;
    justify-content: center;
    animation: nudge 1.2s ease-in-out infinite;
  }

  @keyframes nudge {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(6px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
