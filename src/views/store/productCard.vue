<template>
  <div class="productList">
    <ul>
      <li class="listImage">
        <img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
          alt="다람쥐사진"
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
export default {
  data() {
    return {
      items: []
    };
  }
};
</script>

<style lang="scss" scoped>
.productList {
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 240px;
    padding: 0 4px 30px 4px;
    list-style: none;
    transition: all 0.2s ease-in-out;
    object-fit: cover;
    overflow: hidden;
    &:hover {
      cursor: pointer;
      transform: scale(1.03);
      background-color: rgba(0, 0, 0, 0.03);
    }

    li {
      width: 100%;
    }
    .listImage {
      height: 256px;

      img {
        width: 100%;
        height: 100%;
        transform: scale(1);
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
