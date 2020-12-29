<template>
  <div class="signUpContainer">
    <NavBar class="nav"></NavBar>
    <h2 class="signUpHeader">회원가입</h2>
    <div class="joinSteps">
      <div>본인인증</div>
      <div>정보수집동의</div>
      <div class="firstStep">정보입력</div>
      <div>가입완료</div>
    </div>
    <div class="inputSection">
      <div class="inputTop">
        <input type="text" placeholder="아이디 입력" />
        <input type="text" placeholder="이메일 입력" />
      </div>
      <div class="inputMessage">이메일 정보는 비밀번호 찾기시 사용됩니다.</div>
      <div class="inputBottom">
        <input type="password" placeholder="비밀번호 입력" />
        <input type="password" placeholder="비밀번호 확인" />
      </div>
      <div class="thrConfirmBtn">
        <v-btn><a href="/ ">가입 완료</a></v-btn>
      </div>
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
    Footer: Footer,
  },
};
</script>

<style lang="scss" scoped>
.signUpContainer {
  text-align: center;

  .nav {
    margin: 0 auto;
  }

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
  .inputSection {
    width: 730px;
    margin: 0 auto;
    .inputTop {
      margin: 50px 0 20px 0;

      input {
        display: block;
        width: 100%;
        height: 50px;
        padding-left: 15px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 3px;

        &::placeholder {
          color: rgba(0, 0, 0, 0.2);
        }
      }
    }

    .inputMessage {
      text-align: left;
      padding-left: 15px;
    }

    .inputBottom {
      margin: 20px 0;

      input {
        display: block;
        width: 100%;
        height: 50px;
        padding-left: 15px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 3px;

        &::placeholder {
          color: rgba(0, 0, 0, 0.2);
        }
      }
    }
    .thrConfirmBtn {
      margin-top: 30px;
      button {
        background-color: black;
        color: white;

        a {
          text-decoration: none;
          color: black;
          padding: 25px;
        }
      }
    }
  }
}
</style>
