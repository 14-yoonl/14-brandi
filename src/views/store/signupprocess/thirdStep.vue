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

    <v-container>
      <v-form v-model="test">
        <v-text-field
          v-model="state.id"
          label="아이디"
          :rules="idRules"
          prepend-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          type="email"
          v-model="state.email"
          label="이메일"
          prepend-icon="mdi-account"
        ></v-text-field>
        <div class="inputMessage">
          이메일 정보는 비밀번호 찾기시 사용됩니다.
        </div>
        <v-text-field
          type="password"
          v-model="state.password"
          :rules="passwordRules"
          label="비밀번호"
          prepend-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          type="password"
          :rules="re_passwordRules"
          label="비밀번호 확인"
          prepend-icon="mdi-checkbox-marked-circle-outline"
        ></v-text-field>
        <v-btn class="gotoFinal" color="success" @click="postTest">
          <a href="/signupDone">가입 완료</a></v-btn
        >
      </v-form>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../navBar";
import Footer from "../footer";
export default {
  data() {
    return {
      state: {
        id: "",
        password: "",
        email: ""
      },
      idRules: [
        v => !!v || "아이디는 필수 입력항목입니다.",
        v =>
          /^[A-Za-z]{1}[A-Za-z0-9]{5,19}$/.test(v) ||
          "길이는 6~20 사이, 한글 및 특수문자는 사용하실수 없습니다."
        // async v => ((await this.serverValidCheck("")) ? "111" : "22")
      ],
      passwordRules: [
        v => !!v || "비밀번호는 필수 입력항목입니다.",
        v =>
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,19}$/.test(v) ||
          "비밀번호는 최소 8자 이상, 특수문자, 대문자, 소문자를 입력해주세요"
      ],
      re_passwordRules: [
        v => !!v || "비밀번호 확인은 필수 입력항목입니다.",
        v => this.state.password === v || "비밀번호가 일치하지 않습니다."
      ]
    };
  },
  components: {
    NavBar: NavBar,
    Footer: Footer
  },
  methods: {
    postTest() {
      this.$store.commit("test", this.state);
    },
    onSubmit() {
      this.$validator.validateAll();

      if (!this.errors.any()) {
        alert("submit");
      }
    }
  }
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
  .gotoFinal {
    a {
      text-decoration: none;
      color: white;
    }
  }
}
</style>
