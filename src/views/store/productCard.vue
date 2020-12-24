<template>
  <div class="productList">
    <ul>
      <li class="listImage">
        <img
          src="https://i.ibb.co/D7DZg3k/TH0-U6-FBTN-U019-SDQ4-LBC-9b19a40fac7d-512.png"
          alt="다람쥐사진"
        />
      </li>
      <li class="listSeller"><span>성보의 하루</span></li>
      <li class="listTitle"><em>14기 대표 러블리 성보좌</em></li>
      <li class="listPrice">
        <span class="dcPercent">20%</span>
        <span class="bPrice">1,800,000</span>
        <span class="aPrice">2,000,000</span>
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
    padding: 0 5px 30px 5px;
    list-style: none;
    transition: all 0.2s ease-in-out;
    object-fit: cover;
    overflow: hidden;
    &:hover {
      cursor: pointer;
      transform: scale(1.03);
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
      margin-top: 10px;
      font-size: 13px;
      font-weight: 500;
      color: #757575;
    }
  }
}
</style>
