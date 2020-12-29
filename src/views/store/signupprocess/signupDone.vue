<template>
  <div class="finalStep">
    <NavBar></NavBar>
    <div class="finalWelcome">
      <img
        src="https://www.brandi.co.kr/static/20.09.01/images/logo@3x.png"
        alt=""
      />
      <div>브랜디에 오신걸 환영합니다!</div>
      <router-link to="/"><v-btn>홈으로</v-btn></router-link>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../NavBar";
import Footer from "../footer";

export default {
  data() {
    return {};
  },
  components: {
    NavBar: NavBar,
    Footer: Footer
  }
};
</script>

<style lang="scss" scoped>
.finalStep {
  .finalWelcome {
    width: 500px;
    margin: 150px auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      margin-bottom: 150px;
      opacity: 50%;
    }
    div {
      font-size: 34px;
      color: rgba(0, 0, 0, 0.5);
      margin-bottom: 50px;
    }
  }
}
</style>
