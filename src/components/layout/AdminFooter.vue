<template>
  <footer class="AdminFooter">
    <div class="descContainer">
      <p class="desc">
        | 상호 : (주)브랜디 | 주소 : (06223) 서울특별시 강남구 테헤란로 32길 26
        청송빌딩 | 사업자등록번호 : 220-88-93187 | 통신판매업신고 :
        2016-서울강남-00359호 | 이메일 : help@brandi.co.kr 2020
      </p>
      <p class="desc">
        © brandi inc.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AdminFooter"
};
</script>

<style lang="scss" scoped>
.AdminFooter {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #35363a;
  .desc {
    line-height: 10px;
    margin: 5px;
    margin-left: 10px;
    font-size: 12px;
    color: #999ba2;
  }
}
</style>
