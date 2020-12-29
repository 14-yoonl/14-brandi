<template>
  <div class="productList">
    <a href="">
      <ul>
        <li class="listImage">
          <img :src="imageUrl" alt="다람쥐사진" />
        </li>
        <li class="listSeller">
          <span>{{ seller }}</span>
        </li>
        <li class="listTitle">
          <em>{{ name }}</em>
        </li>
        <li class="listPrice">
          <span class="dcPercent">{{ discountRate }}%</span>
          <span class="bPrice">{{ newDiscountedPrice }}</span>
          <span class="aPrice">{{ newOriginPrice }}</span>
        </li>
        <li class="productCount">{{ newCount }}개 판매중</li>
      </ul>
    </a>
  </div>
</template>

<script>
export default {
  props: [
    "seller",
    "imageUrl",
    "name",
    "originPrice",
    "discountRate",
    "discountedPrice",
    "count",
  ],
  data() {
    return {
      newOriginPrice: Number(this.originPrice).toLocaleString(),
      newDiscountedPrice: Number(this.discountedPrice).toLocaleString(),
      newCount: Number(this.count).toLocaleString(),
    };
  },
  computed: {
    params: function () {
      return this.$route.params;
    },
    created() {
      const id = this.$route.params.id;

      if (id === undefined) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.productList {
  a {
    text-decoration: none;
    color: black;
  }
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
