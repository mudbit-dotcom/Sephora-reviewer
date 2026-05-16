<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  let { data } = $props();

  const bodyParagraph = $derived.by(() => data.sephora.body || '');
  const bodyBullets = $derived.by(() => data.sephora.bodyBullets || []);
  const imageSrc = $derived.by(() => data.sephora.imageSrc || '');
  const commentsStorageKey = $derived.by(
    () => `sephora-comments-${data.sephora.rank}`
  );

  let comments = $state([]);
  let commenterName = $state('');
  let commentText = $state('');
  let formError = $state('');

  onMount(() => {
    try {
      const saved = localStorage.getItem(commentsStorageKey);

      if (!saved) {
        return;
      }

      const parsed = JSON.parse(saved);
      comments = Array.isArray(parsed) ? parsed : [];
    } catch {
      comments = [];
    }
  });

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.remove();
  }

  function saveComments(nextComments) {
    comments = nextComments;
    localStorage.setItem(commentsStorageKey, JSON.stringify(nextComments));
  }

  function submitComment(event) {
    event.preventDefault();

    const name = commenterName.trim();
    const text = commentText.trim();

    if (!name || !text) {
      formError = 'Please add your name and a comment.';
      return;
    }

    formError = '';

    const nextComments = [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name,
        text,
        createdAt: new Date().toISOString(),
      },
      ...comments,
    ];

    saveComments(nextComments);
    commenterName = '';
    commentText = '';
  }

  function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
</script>

<svelte:head>
  <title>{data.sephora.name} | Sephora NYC Reviews</title>
  <meta
    name="description"
    content={`Details and photo for ${data.sephora.name} in ${data.sephora.borough}.`}
  />
</svelte:head>

<main class="detail-page">
  <a class="back-link" href={`${base}/`}>Back to ranking</a>

  <h1>{data.sephora.name}</h1>
  <p class="meta">Rank #{data.sephora.rank} | Rating {data.sephora.rating} | {data.sephora.borough}</p>
  <p class="address">{data.sephora.address}</p>
  {#if bodyParagraph || bodyBullets.length}
    <section class="story-section" aria-label="Review summary">
      <h2 class="story-heading">Key Reviews Say</h2>
      {#if bodyParagraph}
        <p class="story-body">{bodyParagraph}</p>
      {/if}
      {#if bodyBullets.length}
        <ul class="story-bullets">
          {#each bodyBullets as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      {/if}
    </section>
  {/if}

  {#if imageSrc}
    <figure>
      <img src={imageSrc} alt={`Storefront photo for ${data.sephora.name}`} onerror={handleImageError} />
    </figure>
  {/if}

  <section class="comments-section" aria-label="User comments">
    <h2 class="comments-title">Leave a Comment</h2>
    <form class="comment-form" onsubmit={submitComment}>
      <label for="commenter-name">Name</label>
      <input
        id="commenter-name"
        type="text"
        bind:value={commenterName}
        maxlength="80"
        placeholder="Your name"
      />

      <label for="comment-text">Your review</label>
      <textarea
        id="comment-text"
        bind:value={commentText}
        rows="4"
        maxlength="600"
        placeholder="Share your experience at this location..."
      ></textarea>

      {#if formError}
        <p class="form-error">{formError}</p>
      {/if}

      <button type="submit">Post Comment</button>
    </form>

    <h3 class="comments-subtitle">Recent Comments</h3>
    {#if comments.length}
      <ul class="comments-list">
        {#each comments as comment (comment.id)}
          <li class="comment-item">
            <p class="comment-meta">
              <strong>{comment.name}</strong>
              <span>{formatTimestamp(comment.createdAt)}</span>
            </p>
            <p class="comment-text">{comment.text}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="empty-comments">No comments yet. Be the first to post one.</p>
    {/if}
  </section>
</main>

<style lang="scss">
  .detail-page {
    max-width: 900px;
    margin: 0 auto;
    padding: var(--spacing-lg);
  }

  .back-link {
    display: inline-block;
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-serif);
  }

  h1 {
    margin-bottom: var(--spacing-xs);
  }

  .meta,
  .address {
    margin-bottom: var(--spacing-xs);
  }

  .story-section {
    margin: 0 0 var(--spacing-md);
    padding: var(--spacing-sm);
    background: linear-gradient(
      135deg,
      var(--color-light-gray) 0%,
      var(--color-white) 100%
    );
    border-left: var(--border-width-accent) solid var(--color-accent);
    border-radius: var(--border-radius-sm);
  }

  .story-heading {
    margin: 0 0 var(--spacing-xxs);
    font-family: var(--font-serif);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    color: red;
  }

  .story-body {
    margin: 0;
    font-size: var(--font-size-base);
    line-height: var(--leading-relaxed);
    color: var(--color-dark);
  }

  .story-body::first-letter {
    color: var(--color-accent);
    font-weight: var(--font-weight-bold);
  }

  .story-bullets {
    margin: var(--spacing-xs) 0 0;
    padding-left: 1.25rem;
    color: var(--color-dark);
    line-height: var(--leading-relaxed);
  }

  .story-bullets li {
    margin-bottom: var(--spacing-xxs);
  }

  .story-bullets li::marker {
    color: var(--color-accent);
  }

  figure {
    margin-top: var(--spacing-md);
  }

  img {
    width: 100%;
    height: auto;
    border: 1px solid var(--color-border);
  }

  figcaption {
    margin-top: var(--spacing-xs);
    color: var(--color-medium-gray);
    font-size: var(--font-size-sm);
  }

  .comments-section {
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-sm);
    border-top: 1px solid var(--color-border);
  }

  .comments-title {
    margin: 0 0 var(--spacing-xs);
    font-size: var(--font-size-xl);
  }

  .comment-form {
    display: grid;
    gap: var(--spacing-xxs);
    margin-bottom: var(--spacing-md);

    label {
      font-family: var(--font-serif);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
    }

    input,
    textarea {
      width: 100%;
      padding: var(--spacing-xs);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-sm);
      font-family: var(--font-sans);
      font-size: var(--font-size-base);
    }

    button {
      justify-self: start;
      padding: var(--spacing-xs) var(--spacing-sm);
      border: none;
      border-radius: var(--border-radius-sm);
      background: var(--color-accent);
      color: var(--color-white);
      font-family: var(--font-sans);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
    }
  }

  .form-error {
    margin: 0;
    color: red;
    font-size: var(--font-size-sm);
  }

  .comments-subtitle {
    margin: 0 0 var(--spacing-xs);
    font-size: var(--font-size-lg);
  }

  .comments-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .comment-item {
    padding: var(--spacing-xs) 0;
    border-top: 1px solid var(--color-border);
  }

  .comment-meta {
    display: flex;
    gap: var(--spacing-xs);
    align-items: baseline;
    margin: 0 0 var(--spacing-xxs);
    font-size: var(--font-size-sm);

    span {
      color: var(--color-medium-gray);
    }
  }

  .comment-text {
    margin: 0;
    line-height: var(--leading-relaxed);
  }

  .empty-comments {
    margin: 0;
    color: var(--color-medium-gray);
  }
</style>
