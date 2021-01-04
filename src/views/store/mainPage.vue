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
        <productCard
          v-for="item in cards"
          :key="item.id"
          :item="item"
          v-on:click="petchData"
        />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import productCard from "./productCard.vue";
import NavBar from "./navBar";
import Footer from "./footer";
import axios from "axios";

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
          message: "success",
          result: {
            event: [
              {
                id: 1,
                banner_image: "url"
              }
            ],
            product_list: [
              {
                discount_rate: 0.1,
                discounted_price: 9000.0,
                image_url:
                  "https://img.freepik.com/free-psd/simple-black-men-s-tee-mockup_53876-57893.jpg?size=338&ext=jpg&ga=GA1.2.1060993109.1605750477",
                origin_price: 10000.0,
                product_id: 99,
                product_name: "성보의하루99",
                sales_count: 55,
                seller_id: 4,
                seller_name: "나는셀러4"
              }
            ]
          }
        }
      ],
      cardList: []
    };
  },
  components: {
    NavBar: NavBar,
    productCard: productCard,
    Footer: Footer
  },
  methods: {
    petchData() {
      axios.get(`http://192.168.40.116:5000/products?offset=0"`);
    }
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
