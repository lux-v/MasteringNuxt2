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
        <input type="text" class="datepicker" placeholder="Check in" />
        <input type="text" class="datepicker" placeholder="Check out" />
        <button>
          <img src="/images/icons/search.svg" />
        </button>
      </div>
      <div class="app-user-menu">
        <img src="/images/icons/house.svg" />
        <div class="name">Host</div>
        <div id="googleButton"></div>
      </div>
    </header>
    <nuxt />
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
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

    //--------------This could be moved into plugins-----------------
    google.accounts.id.initialize({
      client_id: this.$config.auth.clientId,
      callback: this.parseUser,
      context: "signin",
    });

    google.accounts.id.renderButton(document.getElementById("googleButton"), {
      type: "standard",
      size: "large",
      text: "signin_with",
      shape: "rectangular",
      logo_alignment: "center",
      width: 250,
    });
    //---------------------------------------------------------------
  },
  methods: {
    //--------------This could be moved into plugins-----------------
    parseUser(res) {
      const credential = jwt_decode(res.credential);
    },
    //---------------------------------------------------------------

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
