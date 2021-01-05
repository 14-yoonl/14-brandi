<template>
  <div class="productsDetail">
    <NavBar class="nav"></NavBar>
    <div class="detailFrame">
      <div class="productDetail">
        <!-- 위쪽 사진 & 정보 -->
        <div class="datailTop">
          <!-- 왼쪽 -->
          <div class="thumbnails">
            <div><img src="/" alt="thums" /></div>
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
  data() {
    return {};
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
  }
}
</style>
