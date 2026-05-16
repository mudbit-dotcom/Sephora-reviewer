<script>
  let { children } = $props();
</script>

<div class="vertical-scroller" tabindex="0">
  {@render children()}
</div>

<style lang="scss">
  @use '../../styles' as *;

  .vertical-scroller {
    height: 100dvh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
    background: white;
  }

  .vertical-scroller > * {
    scroll-snap-align: start;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Ensure content inside panels can scroll if it overflows */
  .vertical-scroller > * > .container {
    max-height: 100dvh;
    overflow: auto;
  }
</style>
