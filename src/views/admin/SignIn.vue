<template>
  <div class="LoginPage">
    <div class="loginForm">
      <div class="loginLogo">
        <img src="../../assets/logo.png" /><span>BRANDI ADMIN</span>
      </div>
      <div class="inputbox">
        <input type="text" placeholder="아이디를 입력해주세요" />
      </div>
      <div class="inputbox">
        <input type="password" placeholder="비밀번호를 입력해주세요" />
      </div>
      <div class="rememberCheck">
        <v-checkbox
          label="아이디/비밀번호 기억하기"
          color="red darken-3"
          value="red darken-3"
          class="test"
        ></v-checkbox>
      </div>
      <div class="actionForm">
        <div class="siginInBtn" @click="login">로그인</div>
        <span
          >아직 셀러가 아니신가요?<router-link to="/admin/signUp"
            >회원가입하기</router-link
          ></span
        >
        <router-link to="/admin/signUp" class="findLogin"
          >아이디/비밀번호를 잊으셨나요?</router-link
        >
      </div>
      <div class="plusFriend" @click="goTokakaoPlus()">
        >
        <a href="https://pf.kakao.com/_pSxoZu">카카오톡 플러스친구</a>
        <span>@브랜디셀러</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "test",
      password: "1234"
    };
  },
  methods: {
    goTokakaoPlus() {
      window.open("https://pf.kakao.com/_pSxoZu");
    },
    async login() {
      //   try {
      //     const loginData = {
      //       id: this.id,
      //       password: this.password
      //     };
      //     const { data } = await login(loginData);
      //     sessionStorage.setItem("tokken", data.tokeen);
      //     this.$router.push({ name: "admin" });
      //   } catch (err) {
      //     console.log("error", err);
      //   }
    }
  }
};
</script>
<style lang="scss" scoped>
.LoginPage {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;

  .loginForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 600px;
    padding: 20px 40px;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);

    .loginLogo {
      display: flex;
      align-items: center;
      height: 100px;

      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }

      span {
        font-size: 25px;
        font-weight: bold;
      }
    }
    .inputbox {
      width: 100%;
      margin: 8px 0;
      padding: 13px;

      input {
        width: 100%;
        outline: none;
      }
    }

    .rememberCheck {
      display: flex;
      width: 100%;
      margin: 5px 0;

      .v-input {
        margin: 0;
        padding: 0 10px;
      }
    }

    .actionForm {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .siginInBtn {
        text-align: center;
        width: 100%;
        margin: 10px 0;
        padding: 10px 0;
        color: white;
        border-radius: 15px;
        background-color: black;
        cursor: pointer;
      }

      span {
        margin: 5px 0;
        font-size: 15px;
        color: #929292;
        text-decoration: none;

        a {
          margin: 0 5px;
          text-decoration: none;
        }
      }

      .findLogin {
        font-size: 15px;
        color: #929292;
        text-decoration: none;
      }
    }

    .plusFriend {
      width: 100%;
      padding: 10px;
      text-align: center;
      border: 1px solid #e5e5e5;
      border-radius: 15px;
      margin-top: auto;
      cursor: pointer;

      a {
        font-size: 15px;
        color: #929292;
        text-decoration: none;
      }

      span {
        margin-left: 3px;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
}
</style>
