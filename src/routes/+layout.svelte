<!--
@component
This is the LAYOUT file.
It wraps every page on your site.
Use it for headers, footers, and navigation that appear on all pages.
-->
<script>
  // Import global styles
  import '../app.scss';

  // Import site-wide components
  import SiteFooter from '$lib/components/Layout/SiteFooter.svelte';

  // In Svelte 5, we use $props() to receive the page content
  let { children } = $props();
</script>

<div class="page-shell">
  <main>
    <!-- This renders the current page's content -->
    {@render children()}
  </main>

  <SiteFooter />
</div>

<style>
  /* Styles here only apply to this layout */
  .page-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
</style>
