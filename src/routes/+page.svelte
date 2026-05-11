<!--
@component
This is your page!
-->
<script>
import { base } from '$app/paths';
import DatabaseHeader from '$lib/components/Data/DatabaseHeader.svelte';
import RankingList from '$lib/components/Data/RankingList.svelte';
import RankingCard from '$lib/components/Data/RankingCard.svelte';
import SearchInput from '$lib/components/Forms/SearchInput.svelte';
import MethodologyBox from '$lib/components/Article/MethodologyBox.svelte';

  let { data } = $props();

  let search = $state('');

  let filtered = $derived(
    [...(data.sephoras.locations ?? [])]
      .filter((b) => b.address.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 30)
  );
</script>

<svelte:head>
  <title>{data.sephoras.title}</title>
  <meta name="description" content="Ranked NYC Sephora locations" />
</svelte:head>

<DatabaseHeader
  kicker="The New York City Sephora Database"
  headline="Sephora Locations in NYC, Ranked by Average Google Review Rating"
  description="Which Sephora locations to avoid, and which ones are worth the visit." 
  byline="Niya Doyle"
  date="Updated as of May 2026"/>
<SearchInput bind:value={search} placeholder="Search by borough..." />

<RankingList title={search ? `Showing top ${filtered.length} results` : 'Poorly reviewed Sephoras ranked'}>
  {#each filtered as sephora (sephora.rank)}
    <RankingCard
      href={`${base}/sephora/${sephora.rank}`}
      rank={sephora.rank}
      title={sephora.name}
      description={sephora.address}
      value={sephora.rating}
      valueLabel="Rating"
    />
  {/each}
</RankingList>

  <MethodologyBox>
    <p>
      The data on this page comes from Google Places API, which aggregates user reviews and ratings for businesses. The rankings are based on the average rating for each Sephora location in New York City, as of May 2026. Only locations with at least 50 reviews were included in the ranking to ensure a more reliable average rating. 
    </p>
  </MethodologyBox>