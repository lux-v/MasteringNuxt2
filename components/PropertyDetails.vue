<template>
  <div class="app-wrapper">
    <div class="app-double-column app-property-details">
      <div>
        <h1>{{ home.title }}</h1>
        <div class="app-flex">
          <div class="app-address">
            {{ home.location.address }} {{ home.location.city }}
            {{ home.location.state }} {{ home.location.country }}
          </div>
          <div class="app-rating">
            {{ home.reviewValue }} <span>({{ home.reviewCount }})</span>
          </div>
        </div>
        <div class="app-property-details-footer">
          {{ pluralize(home.guests, "guest") }} &middot;
          {{ pluralize(home.bedrooms, "room") }} &middot;
          {{ pluralize(home.beds, "bed") }} &middot;
          {{ pluralize(home.bathrooms, "bath") }}
        </div>
      </div>
      <div>
        <div class="app-price">
          ${{ home.pricePerNight }}<span> / night</span>
        </div>

        <input class="datepicker" />
        <input class="datepicker" />

        <button class="app-big-button">Request to book!</button>
      </div>
    </div>
  </div>
</template>
<script>
import pluralize from "~/utils/pluralize";

export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pluralize,
  },
};
</script>