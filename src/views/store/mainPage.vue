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
        <productCard v-for="item in cards" :key="item.id" :item="item">
        </productCard>
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
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      cards: [
        {
          id: 1,
          sellerName: "미우블랑",
          imageUrl:
            "https://image.brandi.me/cproduct/2019/12/16/12635118_1576508021_image1_M.jpg",
          name: "쫀쫀 심플 기모 목폴라(6color)_미우블랑",
          originPrice: 9800,
          discountRate: 0,
          discountedPrice: 9800,
          count: 432
        },
        {
          id: 2,
          sellerName: "로젠하이",
          imageUrl:
            "https://image.brandi.me/cproduct/2019/06/25/9350924_1561425223_image1_M.jpg",
          name: "일론 스티치 반팔 미니-원피스(린넨55%)",
          originPrice: 26000,
          discountRate: 18,
          discountedPrice: 18720,
          count: 1136
        }
      ]
    };
  },
  components: {
    NavBar: NavBar,
    productCard: productCard,
    Footer: Footer
  }
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
