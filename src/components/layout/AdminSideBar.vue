<template>
  <aside class="AdminSideBar">
    <ul v-for="(topValue, menuList, index) in menuList" v-bind:key="index">
      <li>
        <input type="radio" name="navList" :id="`nav` + index" />
        <label :for="`nav` + index" class="navbtn">{{ menuList }}</label>
        <div class="submenu">
          <a v-for="(menu, topValue) in topValue" v-bind:key="menu">
            {{ topValue }}
          </a>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "adminSideBar",
  methods: {},
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
        상품관리: { 상품관리: {}, 상품등록: {} },
        고객응대관리: { "Q&A관리": {}, 텍스트리뷰: {} },
        "기획전/쿠폰관리": { 기회적관리: {}, 쿠폰관리: {} },
        회원관리: { 회원관리: {}, 셀러관리: {} }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.AdminSideBar {
  display: flex;
  flex-direction: column;
  width: 10%;
  min-width: 150px;
  margin-top: 80px;
  color: #f1f1f1;
  font-size: 14px;
  font-weight: 300;

  ul {
    width: 100%;
    padding: 0;
    list-style: none;

    li {
      overflow: hidden;
      border-bottom: 1px solid #414247;
      margin-left: 20px;

      input[type="radio"] {
        display: none;
      }

      input[id*="nav"]:checked + .navbtn + .submenu {
        max-height: 1000px;
      }

      .navbtn {
        display: block;
        position: relative;
        padding: 13px 0;
        color: #fff;
        cursor: pointer;

        &:hover {
          background: #2b2b30;
        }
      }

      .submenu {
        display: flex;
        flex-direction: column;
        max-height: 0;
        transition: max-height 0.5s;
        overflow: hidden;

        a {
          padding: 8px 8px 8px 15px;
          color: #cecfd3;

          &:hover {
            background-color: #414247;
          }
        }
      }
    }
  }
}
</style>
