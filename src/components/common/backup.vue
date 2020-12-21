<template>
  <aside class="AdminSideBar">
    <img src="../../assets/logo.png" />
    <ul v-for="(topValue, menuList) in menuList">
      <li @click="handleClick">
        <a>{{ menuList }}</a>
        <ul class="menuSub" v-for="(menu, topValue) in topValue">
          <li>{{ topValue }}</li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "adminSideBar",
  methods: {
    handleClick: e => {
      console.log(e.target);
    }
  },
  data() {
    return {
      menuList: {
        홈: {},
        통계: { 시간단위분석: {} },

        주문관리: {
          결제완료관리: {},
          상품준비관리: {},
          배송중관리: {},
          배송완료관리: {},
          구매확정관리: {}
        },
        "취소/환불관리": {
          환불요청관리: {},
          환불완료관리: {},
          주문취소완료관리: {}
        },
        상품관리: { 상품관리: {}, 상품등록: {} }
      },
      고객응대관리: { "Q&A관리": {}, 텍스트리뷰: {} },
      "기획전/쿠폰관리": { 기회적관리: {}, 쿠폰관리: {} },
      회원관리: { 회원관리: {}, 셀러관리: {} }
    };
  }
};
</script>

<style lang="scss" scoped>
.AdminSideBar {
  display: flex;
  flex-direction: column;
  width: 250px;
  color: #f1f1f1;
  font-size: 16px;
  font-weight: 300;

  img {
    width: 50px;
    height: 50px;
    margin: 0 auto 30px auto;
  }

  ul {
    padding: 0 20px;
    margin: 5px 0;
    list-style: none;

    li {
      cursor: pointer;

      a:link + .menuSub,
      .menuSub:hover {
        li {
          display: block;
        }
      }

      ul {
        li {
          display: none;
        }
      }
    }
  }
}
</style>
