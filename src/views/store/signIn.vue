<template>
  <div class="wrap">
    <navbar></navbar>
    <div class="SignInPage">
      <div class="itemWraper">
        <div class="loginTop">
          <h2>오늘 사면 내일 도착!</h2>
          <div>무료배송으로 내일 받는 브랜디 LOGIN</div>
        </div>
        <div class="loginBottom">
          <input type="text" class="idInput" placeholder="아이디 입력" />
          <input type="text" class="pwInput" placeholder="비밀번호 입력" />
          <button class="logInButton"><a href="/">로그인</a></button>

          <button class="signUpButton"><a href="/signUp">회원가입</a></button>
          <button class="socialLogin">
            <img
              src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5rH/image/aFrEyVpANu07FvoBZQbIB4aF_uc"
              alt="구글 로고"
            />
            <span>구글계정으로 계속하기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./navBar";
export default {
  components: {
    navbar: NavBar
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;

  .SignInPage {
    width: 1265px;
    margin: 0 auto;

    .itemWraper {
      width: 100%;
      padding: 0 20px;

      .loginTop {
        padding-top: 40px;
        text-align: center;

        h2 {
          margin-top: 20px;
          color: red;
        }
      }
      .loginBottom {
        display: flex;
        width: 600px;
        flex-direction: column;
        margin: 0 auto;
        padding: 0 16px 16px 16px;

        input {
          margin: 4px 0;
          padding: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        .logInButton {
          height: 50px;
          margin: 10px 0 2px 0;
          color: white;
          background-color: black;

          a {
            text-decoration: none;
            color: white;
          }
        }
        .signUpButton {
          a {
            padding: 15px 250px;
            text-decoration: none;
            color: black;
          }
        }

        .signUpButton,
        .socialLogin {
          height: 50px;
          margin: 10px 0 2px 0;
          border: 1px solid black;
        }

        .socialLogin {
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}
</style>
