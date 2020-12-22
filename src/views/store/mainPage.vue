<template>
  <div class="mainWrap">
    <NavBar />
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <div class="mainProducts">
      <h2 class="productHeader">당신을 위한 추천</h2>
      <productCard />
    </div>
  </div>
</template>

<script>
import productCard from "./productCard.vue";
import NavBar from "./NavBar";

export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  components: {
    NavBar: NavBar,
    productCard: productCard,
  },
};
</script>

<style lang="scss" scoped>
.mainWrap {
  display: flex;
  flex-direction: column;
  align-items: center;

  .mainProduct {
    max-width: 1300px;
    padding: 0px 30px;
  }
}
</style>