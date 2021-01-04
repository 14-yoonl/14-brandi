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

          <GoogleLogin
            :params="params"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
          >
            <img
              src="https://www.brandi.co.kr/static/20.09.01/images/google-logo.png"
              alt="구글 로고"
            />
            <span>구글계정으로 로그인하기</span>
          </GoogleLogin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import NavBar from "./navBar";
import API from "@/store/config.js";

export default {
  data() {
    return {
      params: {
        client_id:
          "15026492474-0jhj7d4r0r2mugin72a41l9ig76084ev.apps.googleusercontent.com"
      }
    };
  },

  components: {
    navbar: NavBar,
    GoogleLogin
  },

  methods: {
    onSuccess(googleUser) {
      console.log("구글유저>>>>", googleUser.xc.access_token);
      console.log("basicprofile>>>>>", googleUser.getBasicProfile());
      axios
        .post("`${API}/social-signin`", {
          Authorization: googleUser.xc.access_token
        })
        .then(function(response) {
          localStorage.setItem("access_token", res.data.token);
        })
        .then.catch(function(error) {
          console.log(error);
        });
      this.$router.push("/home");
    }
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
