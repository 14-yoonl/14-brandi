<template>
  <div class="SignUpPage">
    <div class="signUpForm">
      <div class="inputbox">
        <input type="text" placeholder="아이디" />
      </div>
      <div class="inputbox">
        <input type="text" placeholder="비밀번호" />
      </div>
      <div class="inputbox">
        <input type="text" placeholder="비밀번호 재입력" />
      </div>
      <div class="inputbox">
        <input type="text" placeholder="핸드폰 번호" />
      </div>
      <v-radio-group v-model="radioGroup" row>
        <v-radio
          v-for="info in checkInfo"
          :key="info"
          :label="info"
          :value="info"
        ></v-radio>
      </v-radio-group>
      <div class="inputbox">
        <input type="text" placeholder="셀러명 (상호)" />
      </div>
      <div class="inputbox">
        <input type="text" placeholder="영문 셀러명 (영문상호)" />
      </div>
      <div class="inputbox" @click="cancelClick">
        <input type="text" placeholder="고객센터 전화번호" />
      </div>
      <div class="actionForm">
        <div class="pushBtn">취소</div>
        <div class="pushBtn">확인</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    cancelClick() {
      this.$router.push({ name: "signIn" });
    }
  },
  data() {
    return {
      checkInfo: [
        "쇼핑몰",
        "마켓",
        "로드샵",
        "디자인브랜드",
        "제너럴브랜드",
        "내셔널브랜드",
        "뷰티"
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

  .signUpForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    /* height: 600px; */
    padding: 20px 40px;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);

    .inputbox {
      width: 100%;
      margin: 8px 0;
      padding: 13px;
      transition: 1s all;

      input {
        width: 100%;
        outline: none;
      }

      &:focus-within {
        border: 1px solid black;
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
}
</style>
