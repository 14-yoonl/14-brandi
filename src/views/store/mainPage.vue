<template>
  <div class="mainWrap">
    <NavBar />
    <v-carousel class="mainImageSlide">
      <v-carousel-item
        v-for="(item, i) in productList"
        :key="i"
        :src="item.event.event_banner_image"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <div class="mainProducts">
      <h2 class="productHeader">당신을 위한 추천</h2>
      <div v-for="products in productList" :key="products.id" class="cardList">
        <eventBanner :event="products.event" />
        <div v-for="item in products.product_list" :key="item.id">
          <productCard :item="item" v-on:click="petchData" />
        </div>
      </div>
      <v-btn v-on:click="increseOffset">더보기</v-btn>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import eventBanner from "./eventBanner";
import productCard from "./productCard.vue";
import NavBar from "./navBar";
import Footer from "./footer";
import axios from "axios";
import API from "@/store/config.js";

export default {
  data() {
    return {
      offset: 0,
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
      cardList: [],
      eventList: [],
      productList: []
    };
  },
  components: {
    NavBar: NavBar,
    productCard: productCard,
    Footer: Footer,
    eventBanner: eventBanner
  },
  methods: {
    increseOffset() {
      this.offset += 1;
      axios
        .get(`${API.API}/products?offset=${this.offset}&limit=30`)
        .then(res => {
          console.log("res>>>", res);
          this.productList.push(res.data.result);
        });
    }
  },
  mounted() {
    axios.get(`${API.API}/products?offset=0&limit=30`).then(response => {
      this.productList.push(response.data.result);
    });
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
