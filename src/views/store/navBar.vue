<template>
  <div class="navBar">
    <div class="navTop">
      <h1 class="logoImage">
        <a href="/"
          ><img
            src="https://www.brandi.co.kr/static/20.09.01/images/logo@3x.png"
            alt=""
        /></a>
      </h1>
      <div class="searchForm">
        <form action="">
          <button><v-icon>mdi-magnify</v-icon></button>
          <input type="text" />
        </form>
      </div>
      <div class="subMenu">
        <span>찜</span>
        <span>장바구니</span>
        <span>마이페이지</span>
        <span>로그인</span>
        <span>입점문의</span>
      </div>
    </div>
    <div class="navBottom">
      <span>홈</span>
      <span>랭킹</span>
      <span>하루배송</span>
      <span>쇼핑몰</span>
      <span>브랜드</span>
      <span>뷰티</span>
      <span>특가</span>
      <span>기획전</span>
      <span>스토어</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navBar {
  width: 1265px;
  padding: 20px 40px;
  .navTop {
    display: flex;
    justify-content: space-between;

    .logoImage {
      width: 190px;

      img {
        width: 100%;
      }
    }

    .searchForm {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 250px;
      padding: 5px 10px;
      border-radius: 25px;
      background-color: rgba(0, 0, 0, 0.05);
    }

    .subMenu {
      span {
        text-align: center;
        margin: 0 4px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        padding: 0 10px;
      }
    }
  }

  .navBottom {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    span {
      padding: 10px 47px;
    }
  }
}
</style>