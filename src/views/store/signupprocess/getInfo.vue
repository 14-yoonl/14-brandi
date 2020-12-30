<template>
  <div class="signUpContainer">
    <NavBar class="nav"></NavBar>
    <h2 class="signUpHeader">회원가입</h2>
    <div class="joinSteps">
      <div>본인인증</div>
      <div class="firstStep">정보수집동의</div>
      <div>정보입력</div>
      <div>가입완료</div>
    </div>
    <div class="selection">
      <h2 class="selectionHeader">가입 약관 동의</h2>
      <div class="selectAll">
        <input type="checkbox" v-model="selectAll" />
        <span>모두 동의</span>
      </div>
      <div class="selectBox">
        <div v-for="user in users" class="selectOption">
          <input type="checkbox" v-model="selected" :value="user.id" />
          <span>{{ user.name }}</span>
        </div>
      </div>
    </div>
    <div class="secConfirmBtn">
      <v-btn><a href="/thirdStep">다음</a></v-btn>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../NavBar";
import Footer from "../footer";

export default {
  data() {
    return {
      users: [
        {
          id: "1",
          name: "브랜디 약관 동의 (필수)",
        },
        {
          id: "2",
          name: "개인정보수집 및 이용에 대한 안내 (필수)",
        },
        {
          id: "3",
          name: "이벤트/마케팅 수신 동의(선택)",
        },
        {
          id: "4",
          name: "야간 혜택 알림 수신동의 (선택)",
        },
      ],
      selected: [],
    };
  },
  computed: {
    selectAll: {
      get: function () {
        return this.users ? this.selected.length == this.users.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.users.forEach(function (user) {
            selected.push(user.id);
          });
        }

        this.selected = selected;
      },
    },
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

  .selection {
    width: 730px;
    margin: 30px auto;
    text-align: left;

    .selectionHeader {
      padding: 25px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .selectAll {
      padding: 30px 0;
    }
    .selectBox {
      padding: 15px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      .selectOption {
        margin: 7px 0;
      }
    }
  }
  .secConfirmBtn {
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
</style>
