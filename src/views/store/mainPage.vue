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
          v-for="item in cardList"
          :key="item.product_id"
          :item="item"
          v-on:click="petchData"
        />
      </div>
      <v-btn v-on:click="increseOffset">더보기</v-btn>
      {{ offset }}
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
      axios.get(
        "`http://192.168.40.118:5000/products/${product_id}`",
        {},
        {
          Authorization: localStorage.getItem(token)
        }
      );
    },
    increseOffset() {
      this.offset += 30;
      axios
        .get(
          `http://192.168.40.116:5000/products?offset=${this.offset}&limit=30`
        )
        .then(res => console.log("반응>>>", res));
    }
  },
  mounted() {
    axios
      .get(`http://192.168.40.116:5000/products?offset=0&limit=30`)
      .then(response => {
        this.cardList = response.data.result.product_list;
      });
  }
  // created() {
  //   axios
  //     .get(`http://192.168.40.116:5000/products?offset=${this.offset}&limit=30`)
  //     .then(res => {
  //       console.log(res);
  //       cardList.push(res);
  //     });
  // }
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
