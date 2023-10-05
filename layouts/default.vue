<template>
  <div class="app">
    <header class="app-header">
      <nuxt-link class="app-logo" to="/">
        <img src="/images/logo.svg" />
      </nuxt-link>

      <div class="app-search">
        <input
          type="text"
          ref="citySearch"
          @changed="changed"
          placeholder="Enter a city"
        />
        <input class="datepicker" />
        <input class="datepicker" />

        <button>
          <img src="/images/icons/search.svg" />
        </button>
      </div>
      <div class="app-user-menu">
        <img src="~/static/images/user.jpg" class="avatar" />
      </div>
    </header>
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      location: {
        lat: 0,
        lng: 0,
        label: "",
      },
      range: {
        start: null,
        end: null,
      },
    };
  },
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch);
  },
  methods: {
    changed(event) {
      const place = event.detail;
      if (!place.geometry) return;

      this.$router.push({
        name: "search",
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value,
        },
      });
    },
  },
};
</script>
