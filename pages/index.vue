<template>
  <div class="app">
    <div class="app-container">
      <div class="app-hero">
        <h2>
          - Settle in somewhere new. Discover stays to live, work, or
          just relax.
        </h2>
      </div>

      <div class="app-search-results-listing">
        <nuxt-link
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <home-row
            class="app-house"
            :home="home"
            @mouseover.native="highlightMarker(home.objectID, true)"
            @mouseout.native="highlightMarker(home.objectID, false)"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Homepage",
      meta: [
        {
          name: "description",
          content:
            "NuxtBNB is an AirBNB app that uses Nuxt, Cloudinary, Stripe, Google Maps and Algolia.  Learn more at MasteringNuxt.com",
          hid: "description",
        },
      ],
    };
  },
  async asyncData({ $dataApi }) {
    return {
      homes: (await $dataApi.getHomes()).json.hits,
    };
  },
  methods: {
    highlightMarker(homeId, isHighlighted) {
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle("marker-highlight", isHighlighted);
    },
  },
};
</script>