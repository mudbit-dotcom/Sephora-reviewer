<!--
@component
This is your page!
-->
<script>
  import { base } from '$app/paths';
  import DatabaseHeader from '$lib/components/Data/DatabaseHeader.svelte';
  import RankingList from '$lib/components/Data/RankingList.svelte';
  import RankingCard from '$lib/components/Data/RankingCard.svelte';
  import MethodologyBox from '$lib/components/Article/MethodologyBox.svelte';
  import DropdownInput from '$lib/components/Forms/DropdownInput.svelte';
  import VerticalScroller from '$lib/components/MultimediaGallery/VerticalScroller.svelte';
  import TitleSlide from '$lib/components/MultimediaGallery/TitleSlide.svelte';
  import TextSlide from '$lib/components/MultimediaGallery/TextSlide.svelte';
  import Map from '$lib/components/Maps/Map.svelte';
  import MapLayer from '$lib/components/Maps/MapLayer.svelte';


  let { data } = $props();
  let sephoras = $derived(data.sephoras.locations ?? []);

  let selected = $state('');
  const boroughOptions = [
    { value: 'Bronx', label: 'Bronx' },
    { value: 'Brooklyn', label: 'Brooklyn' },
    { value: 'Manhattan', label: 'Manhattan' },
    { value: 'Queens', label: 'Queens' },
    { value: 'Staten Island', label: 'Staten Island' },
  ];

let filtered = $derived(
  [...(data.sephoras.locations ?? [])]
    .filter((b) => {
      return !selected || b.borough === selected;
    })
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 30)
);

const sephoraPoints = $derived(
  sephoras.map((sephora) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [sephora.coordinates.longitude, sephora.coordinates.latitude],
    },
    properties: {
      name: sephora.name,
      rank: sephora.rank,
      rating: sephora.rating,
    },
  }))
);

const slideContent = {
  body: 'There are more types of Sephoras than you think. From Sephora Studio, Sephora at Kohl’s, to regular freestanding stores, the beauty retailer has a variety of store formats across New York City. For example, this 34th Herald Square location is the flagship store. It has an average of 3.9 star on Google reviews, which is solid for the busiest location.'
};

const slideContent2 = {
  body: 'But this Sephora inside a Kohls in Bensonhurst has 2.9 star rating on Google reviews. Why the difference? Is it because of the location, the store format, or something else?'
};
const slideContent3 = {
  body: 'There are <span class="highlight">24</span> Sephoras in New York City. Which one is the best? Lets dive into the reviews to find out.'
};

const layerData = $derived.by(() => ({
  type: 'FeatureCollection',
  features: sephoraPoints,
}));

const layerPaint = {
  'circle-color': '#d40000',
  'circle-radius': 6,
  'circle-stroke-color': '#ffffff',
  'circle-stroke-width': 1.5,
  'circle-opacity': 0.9,
};

const slideContent4 = {
  body: 'tktk'
};


</script>

<VerticalScroller>
  <TitleSlide
    headline="I need a Sephora. Which one should I go to?"
    intro="A ranking of all of New York City's Sephora locations, based on average Google review ratings. "
  />

  <TextSlide slide={slideContent}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!4v1778959868771!6m8!1m7!1sGL1npDk5tKBCX3VOPf3MSQ!2m2!1d40.7501833332578!2d-73.98869872819809!3f212.4103347549589!4f9.226811030798899!5f0.7820865974627469"
      width="100%"
      height="400"
      style="border:0; border-radius: 8px;"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </TextSlide>

  <TextSlide slide={slideContent2}>
  <iframe
      src="https://www.google.com/maps/embed?pb=!4v1778961758283!6m8!1m7!1sXMCz-M7xHlFxxz-q0HFOIQ!2m2!1d40.59346305788409!2d-74.00063686087509!3f243.9510307428933!4f0.6342729507403106!5f0.7820865974627469"
      width="100%"
      height="400"
      style="border:0; border-radius: 8px;"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </TextSlide>

  <TextSlide slide={slideContent3}>
   <div class="notes container">
    </div>
    <Map
      longitude={-73.9914662}
      latitude={40.7555711}
      zoom={10.5}
      height={560}
      theme="positron"
      credit="OpenFreeMap / OpenStreetMap contributors"
      border={true}
    >
      <MapLayer
        id="sephora-locations"
        type="circle"
        data={layerData}
        fadeIn={true}
        fadeInDuration={1200}
        fadeInDelay={150}
        fadeInThreshold={0.35}
        paint={layerPaint}
      />
    </Map>
  </TextSlide>

  <div>
    <DatabaseHeader
      kicker="The New York City Sephora Database"
      description="Explore the full database here."
      byline=" by Niya Doyle"
      date="Updated as of May 2026"
    />
  </div>

  <div>
    <div class="container">
      <DropdownInput
        label="Borough"
        placeholder="All boroughs"
        options={boroughOptions}
        bind:value={selected}
      />
    </div>
  </div>

  <div>
    <div class="container">
      <RankingList title={selected ? `Showing ${selected} results` : 'Poorly reviewed Sephoras ranked'}>
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
    </div>
  </div>

  <div>
    <MethodologyBox>
      <p>
        The data on this page comes from Google Places API, which aggregates user reviews and ratings for businesses. The rankings are based on the average rating for each Sephora location in New York City, as of May 2026. Only locations with at least 50 reviews were included in the ranking to ensure a more reliable average rating.
      </p>
    </MethodologyBox>
  </div>

</VerticalScroller>

<svelte:head>
  <title>{data.sephoras.title}</title>
  <meta name="description" content="Ranked NYC Sephora locations" />
</svelte:head>

<!-- moved into VerticalScroller above -->
