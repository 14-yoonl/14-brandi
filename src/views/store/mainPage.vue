<template>
  <div class="mainWrap">
    <NavBar />
    <v-carousel class="mainImageSlide">
      <v-carousel-item
        v-for="(item, i) in slideitems"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <div class="mainProducts">
      <h2 class="productHeader">당신을 위한 추천</h2>
      <div class="cardList">
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
        <productCard />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import productCard from "./productCard.vue";
import NavBar from "./NavBar";
import Footer from "./footer";

export default {
  data() {
    return {
      slideitems: [
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
    Footer: Footer,
  },
};
</script>

<style lang="scss" scoped>
.mainWrap {
  display: flex;
  flex-direction: column;
  align-items: center;

  .mainImageSlide {
    margin-bottom: 30px;
  }

  .mainProducts {
    width: 1300px;
    padding: 0px 30px;
    .productHeader {
      padding-top: 40px;
      margin-bottom: 30px;
      text-align: center;
    }

    .cardList {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
