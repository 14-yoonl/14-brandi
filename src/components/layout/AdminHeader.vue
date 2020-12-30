<template>
  <header class="AdminHeader">
    <div class="headerLeft">
      <img class="brandiLogo" src="../../assets/logo.png" />
      <span class="brandName">B R A N D I</span>
      <span class="desc">internship(internship)</span>
    </div>
    <div class="headerRight">
      <button class="loginedId">로그인한 아이디</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "AdminHeader"
};
</script>

<style lang="scss" scoped>
.AdminHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  background-color: #873b53;
  color: #ffffff;

  .headerLeft {
    display: flex;
    align-items: center;
    margin-left: 20px;
    .brandiLogo {
      width: 30px;
      height: 30px;
      margin-right: 20px;
    }
    .brandName {
      font-size: 16px;
      font-weight: 700;
      margin-right: 20px;
    }
    .desc {
      font-size: 12px;
    }
  }
  .headerRight {
    margin-right: 20px;
    .loginedId {
      outline: none;
    }
  }
}
</style>
