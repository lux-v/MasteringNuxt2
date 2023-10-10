<template>
  <div>
    <nuxt-img
      :src="home.images[0]"
      width="200"
      height="150"
      provider="cloudinary"
    /><br />
    {{ home.title }} <br />
    {{ home.guests }} <br />
    {{ home.pricePerNigth }} / night <br />
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
};
</script>