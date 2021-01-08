<template>
  <div class="SignUpPage">
    <div class="signUpForm">
      <div class="SignUpLogo">
        <img src="../../assets/logo_admin.png" />
      </div>
      <v-container>
        <v-form v-model="test">
          <div class="infoHeader">가입 정보</div>
          <v-text-field
            v-model="memberData.id"
            label="아이디"
            :rules="idRules"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="memberData.password"
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
          <div class="managerInfo">
            담당자 정보<v-icon x-small>mdi-star</v-icon
            ><span> 실제 샵을 운영하시는 분</span>
          </div>
          <v-text-field
            v-model="memberData.managerPhonNumber"
            :rules="phoneNumberRules"
            label="핸드폰 번호"
            prepend-icon="mdi-cellphone"
          ></v-text-field>
          <div class="managerInfoHelp">
            <v-icon small>mdi-information-outline</v-icon>입점 신청 후 브랜디
            담당자가 연락을 드릴 수 있으니 정확한 정보를 기입해주세요.
          </div>
          <div class="infoHeader">
            셀러 정보
          </div>
          <v-radio-group v-model="memberData.sellerType" row class="sellerType">
            <v-radio
              v-for="info in checkInfo"
              :key="info"
              :label="info.value"
              :value="info.key"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            v-model="memberData.sellerName"
            :rules="sellerNameRules"
            label="셀러명(상호)"
            prepend-icon="mdi-sign-text"
          ></v-text-field>
          <v-text-field
            v-model="memberData.sellerEngName"
            :rules="sellerEngNameRules"
            label="셀러명(영문상호)"
            prepend-icon="mdi-sign-text"
          ></v-text-field>
          <v-text-field
            v-model="memberData.ServiceCenterPhon"
            :rules="customerCenterNumber"
            label="고객센터 전화번호"
            prepend-icon="mdi-phone"
          ></v-text-field>
        </v-form>
      </v-container>
      <div class="actionForm">
        <div class="pushBtn" @click="cancelClick">취소</div>
        <div class="pushBtn" @click="sendServer">가입하기</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    cancelClick() {
      this.$router.push({ name: "adminSignIn" });
    },
    sendServer() {
      try {
        const result = this.$store.dispatch("signUp", this.memberData);
        result.then(res => {
          if (res.data.message === "success") {
            this.$router.push({
              name: "adminSignIn"
            });
          }
        });
      } catch (err) {
        console.log(err, "에러 확인 메세지");
      }
    },
    serverValidCheck(aa) {
      const result = this.$store.dispatch("test", aa);

      return result.then(res => {
        return res;
      });
    }
  },
  data() {
    return {
      test: false,
      memberData: {
        id: "",
        password: "",
        managerPhonNumber: "",
        sellerType: "",
        sellerName: "",
        sellerEngName: "",
        ServiceCenterPhon: ""
      },
      checkInfo: [
        { key: 1, value: "쇼핑몰" },
        { key: 2, value: "마켓" },
        { key: 3, value: "로드샵" },
        { key: 4, value: "디자인브랜드" },
        { key: 5, value: "제너럴브랜드" },
        { key: 6, value: "내셔널브랜드" },
        { key: 7, value: "뷰티" }
      ],
      valid: false,
      idRules: [
        v => !!v || "아이디는 필수 입력항목입니다.",
        v =>
          /^[A-Za-z]{1}[A-Za-z0-9]{5,19}$/.test(v) ||
          "길이는 6~20 사이, 한글 및 특수문자는 사용하실수 없습니다."
      ],
      passwordRules: [
        v => !!v || "비밀번호는 필수 입력항목입니다.",
        v =>
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,19}$/.test(v) ||
          "비밀번호는 최소 8자 이상, 특수문자, 대문자, 소문자를 입력해주세요"
      ],
      re_passwordRules: [
        v => !!v || "비밀번호 확인은 필수 입력항목입니다.",
        v => this.memberData.password === v || "비밀번호가 일치하지 않습니다."
      ],
      sellerNameRules: [
        v => !!v || "셀러명(상호)은 필수 입력항목입니다.",
        v => /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/.test(v) || "숫자만 입력해주세요."
      ],
      sellerEngNameRules: [
        v => !!v || "셀러명(상호)은 필수 입력항목입니다.",
        v => /[a-z]/.test(v) || "셀러 영문명은 소문자만 입력가능합니다."
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.SignUpPage {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;

  .signUpForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 530px;
    padding: 20px 40px;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    .SignUpLogo {
      display: flex;
      align-items: center;
      margin: 10px 0 30px 0;

      img {
        position: relative;
        width: 150px;
      }
    }

    .infoHeader {
      position: relative;
      top: 5px;
      left: -5px;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.6);
    }

    .managerInfo {
      position: relative;
      top: 5px;
      left: -5px;
      margin-top: 15px;
      font-size: 17px;
      color: rgba(0, 0, 0, 0.6);

      i {
        position: relative;
        left: 2px;
        top: 2px;
        color: #1e90ff;
      }

      span {
        position: relative;
        top: 1px;
        font-size: 12px;
        color: #1e90ff;
      }
    }

    .managerInfoHelp {
      font-size: 12px;
      color: #1e90ff;
      margin-bottom: 30px;

      i {
        position: relative;
        top: -1px;
        margin-right: 5px;
        color: #1e90ff;
      }
    }

    .sellerType {
      .v-radio {
        margin: 5px 10px;
      }
    }

    .actionForm {
      display: flex;
      width: 100%;

      .pushBtn {
        text-align: center;
        width: 100%;
        margin: 10px 10px;
        padding: 10px 0;
        color: white;
        border-radius: 15px;
        background-color: black;
        cursor: pointer;
      }
    }
  }

  .v-messages__wrapper {
    position: relative !important;
    top: 1px;
  }
}

@media screen and (max-width: 768px) {
  .SignUpPage {
    align-items: flex-start;

    .signUpForm {
      width: 100%;
      margin: 30px;
    }
  }
}

@media screen and (max-width: 550px) {
  .SignUpPage {
    .signUpForm {
      padding: 30px 10px;
    }
  }
}
</style>
