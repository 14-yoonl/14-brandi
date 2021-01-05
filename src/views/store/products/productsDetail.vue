<template>
  <div class="productsDetail">
    <NavBar class="nav"></NavBar>
    <div class="detailFrame">
      <div class="productDetail">
        <!-- 위쪽 사진 & 정보 -->
        <div class="datailTop">
          <!-- 왼쪽 -->
          <div class="thumbnails">
            <div class="mainImg"></div>
            <div class="postPictures"></div>
          </div>
          <!-- 오른쪽 -->
          <div class="productOptions">
            <div class="detailSeller"></div>
            <div class="detailTitle"></div>
            <div class="detailPrice"></div>
            <div class="detailDiscount"></div>
            <div class="detailPoint"></div>
            <div class="detailStars"></div>
            <div class="detailDeliverInfo"></div>
            <div class="detailOptions"></div>
            <div class="detailTotalPrice">{}원</div>
            <div class="detailBuySection">
              <v-btn>바로 구매</v-btn>
            </div>
          </div>
          <!-- 하단 상세 정보 및 사진들 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../navBar";
import axios from "axios";
export default {
  props: ["product_id"],
  data() {
    return {};
  },
  mounted() {
    axios
      .get(
        `http://192.168.40.118:5000/products/${this.$router.history.current.params.id}`,
        {},
        {
          Authorization: localStorage.getItem("token")
        }
      )
      .then(res => console.log(res));
    console.log("ggggg>>>>", this.$router.history.current.params.id);
  },
  components: {
    NavBar: NavBar
  }
};
</script>

<style lang="scss" scoped>
.productsDetail {
  .nav {
    margin: 0 auto;
    .datailTop {
      .thumbnails {
        .mainImg {
          background-image: url("https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80");
        }
      }
    }
  }
}
</style>
