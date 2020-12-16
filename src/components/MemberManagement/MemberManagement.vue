<template>
  <v-container fluid="true">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="name"
      show-select
      class="memberTable"
      :loading="loading"
      loading-text="로딩중... 잠시만 기다려주세요"
    >
      <template v-slot:item.action active-class="actionBtnTemp">
        <v-btn color="success" :disabled="true">휴점신청</v-btn>
        <v-btn color="error" :disabled="false">퇴점신청 처리</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      headers: [
        { text: "번호", value: "number" },
        { text: "셀러 아아디", value: "id" },
        { text: "영문이름", value: "engName" },
        { text: "한글이름", value: "korName" },
        { text: "셀러구분", value: "gubun" },
        { text: "회원번호", value: "memberCnt" },
        { text: "담당자이름", value: "managerName" },
        { text: "셀러상태", value: "sllerState" },
        { text: "담당자연락처", value: "managerPhoneNumber" },
        { text: "담당자이메일", value: "managerEmail" },
        { text: "셀러속성", value: "sllerProperty" },
        { text: "상품개수", value: "productCnt" },
        { text: "등록일시", value: "setDate" },
        { text: "Actions", value: "action" }
      ],
      desserts: [
        {
          bumber: 1,
          id: "app235",
          engName: "jaewon",
          korName: "장재원",
          gubun: "일반셀러",
          memberCnt: 1321,
          sllerState: "입점",
          managerName: "매니저",
          managerPhoneNumber: "010-5309-4965",
          managerEmail: "app23@naver.com",
          sllerProperty: "디자이너브랜드",
          productCnt: 32,
          setDate: "2020-12-16 09:54:10"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped></style>
