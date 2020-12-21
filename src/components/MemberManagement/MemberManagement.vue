<template>
  <div class="MemberManagment">
    <div class="menuHeader">
      <h1>회원 관리</h1>
      <ul>
        <li>회원 계정</li>
        <li>셀러 계정</li>
      </ul>
    </div>
    <div class="contentList">
      <h1>테스트</h1>
      <table>
        <thead>
          <tr>
            <th>
              <v-checkbox
                color="success"
                hide-details
                v-model="selectAll"
              ></v-checkbox>
            </th>
            <th v-for="column in headers">
              {{ column.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in desserts">
            <td>
              <v-checkbox
                color="success"
                :value="member.pk"
                v-model="selected"
                hide-details
              ></v-checkbox>
            </td>
            <td>
              {{ member.number }}
            </td>
            <td>
              {{ member.id }}
            </td>
            <td>
              {{ member.engName }}
            </td>
            <td>
              {{ member.korName }}
            </td>
            <td>
              {{ member.gubun }}
            </td>
            <td>
              {{ member.memberCnt }}
            </td>
            <td>
              {{ member.managerName }}
            </td>
            <td>
              {{ member.sllerState }}
            </td>
            <td>
              {{ member.managerPhoneNumber }}
            </td>
            <td>
              {{ member.managerEmail }}
            </td>
            <td>
              {{ member.sllerProperty }}
            </td>
            <td>
              {{ member.productCnt }}
            </td>
            <td>
              {{ member.setDate }}
            </td>
            <td>
              <v-btn class="success">휴점신청</v-btn>
              <v-btn class="error">퇴점신청 처리</v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
          pk: "pk_1",
          number: 1,
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
        },
        {
          pk: "pk_2",
          number: 2,
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
  },
  methods: {},
  computed: {
    selectAll: {
      get: function() {
        return this.desserts
          ? this.selected.length === this.desserts.length
          : false;
      },
      set: function(value) {
        var selected = [];
        if (value) {
          this.desserts.forEach(member => {
            selected.push(member.pk);
          });
        }
        this.selected = selected;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.MemberManagment {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: 10px 0 0 10px / 10px 0 0 10px;
  background-color: #f3f4f7;

  .menuHeader {
    background-color: white;
    padding: 10px 10px 0 10px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    h1 {
      margin: 5px;
    }

    ul {
      padding: 0;
      list-style: none;
      overflow: hidden;

      li {
        display: flex;
        flex-direction: column;
        margin: 0 10px;
        font-size: 17px;
        float: left;

        &::after {
          content: "";
          width: 100%;
          height: 1px;
          border: 1px solid #10c9b4;
        }
      }
    }
  }

  .contentList {
    height: 100%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    table {
      width: 100%;
      border-spacing: 0;
      border: 1px solid #dddddd;

      .v-input--checkbox {
        display: inline-block;
        position: relative;
        top: 3px;
        left: 3px;
        margin: 0;
        padding: 0;
      }

      thead {
        background-color: #eee;

        tr {
          th {
            text-align: center;
            font-size: 15px;
            padding: 5px 0;
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 5px 0;
            text-align: center;
            font-size: 13px;
            vertical-align: middle;

            button {
              height: auto !important;
              padding: 3px !important;
            }
          }

          &:hover {
            background-color: #eee;
          }
        }
      }
    }
  }
}
</style>
