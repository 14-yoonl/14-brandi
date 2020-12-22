<template>
  <div class="productList">
    <ul>
      <li class="listImage">
        <img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
          alt=""
        />
      </li>
      <li class="listSeller"><span>셀러</span></li>
      <li class="listTitle"><em>제목</em></li>
      <li class="listPrice">
        <span class="dcPercent">10%</span>
        <span class="bPrice">9,000</span>
        <span class="aPrice">10,000</span>
      </li>
      <li class="productCount">300개 구매중</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.productList {
  ul {
    width: 240px;
    padding: 0 2px 30px 2px;
    list-style: none;

    li {
      width: 100%;
    }
    .listImage {
      height: 256px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .listSeller {
      margin-top: 8px;
      font-size: 15px;
    }

    .listTitle {
      font-size: 16px;
    }

    .listPrice {
      span {
        margin-right: 5px;
      }
      .dcPercent {
        font-weight: 600;
        color: red;
        font-size: 20px;
      }

      .bPrice {
        font-weight: 900;
        font-size: 20px;
      }

      .aPrice {
        color: rgba(0, 0, 0, 0.5);
        font-size: 15px;
        text-decoration-line: line-through;
      }
    }
    .productCount {
      font-size: 13px;
      color: #757575;
    }
  }
}
</style>