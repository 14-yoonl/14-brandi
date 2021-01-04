<template>
  <div class="signUpContainer">
    <NavBar class="nav"></NavBar>
    <h2 class="signUpHeader">회원가입</h2>
    <div class="joinSteps">
      <div class="firstStep">본인인증</div>
      <div>정보수집동의</div>
      <div>정보입력</div>
      <div>가입완료</div>
    </div>
    <div class="joinBottom">
      <div class="confirmUser">
        <div class="phoneLogo">
          <img
            src="https://www.brandi.co.kr/static/20.09.01/images/h_icon_join_1_confirm_web(245)@3x.png"
            alt=""
          />
          <h3>브랜디 본인인증</h3>
          <ul>
            <li>14세미만 회원은 가입이 불가능 합니다.</li>
            <li>법인폰 사용자는 휴대폰 인증이 불가합니다.</li>
          </ul>
        </div>
        <div class="confirmBtn">
          <v-btn><a href="/getInfo">휴대폰 인증</a></v-btn>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../navBar";
import Footer from "../footer";
export default {
  components: {
    NavBar: NavBar,
    Footer: Footer
  }
};
</script>

<style lang="scss" scoped>
.signUpContainer {
  .nav {
    margin: 0 auto;
  }
  text-align: center;
  .signUpHeader {
    padding-top: 40px;
    margin: 15px 0;
  }

  .joinSteps {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    color: rgba(0, 0, 0, 0.5);

    .firstStep {
      border-left: 1px solid black;
      border-right: 1px solid black;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 180px;
      height: 110px;
      padding: 12px 0;
    }
  }
  .joinBottom {
    width: 1300px;
    height: 550px;
    margin: 0 auto 30px auto;
    .confirmUser {
      width: 600px;
      height: 530px;
      margin: 10px auto;
      padding: 40px 16px 16px 16px;

      .phoneLogo {
        padding-bottom: 25px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        img {
          width: 200px;
          height: 185px;
          margin: 35px 0 25px 0;
        }
      }

      h3 {
        font-size: 21px;
        margin: 21px 0 12px 0;
      }

      ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 130px;
      }

      .confirmBtn {
        margin-top: 30px;
        button {
          background-color: black;
          color: white;

          a {
            text-decoration: none;
            color: white;
            padding: 25px;
          }
        }
      }
    }
  }
}
</style>
