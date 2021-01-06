<template>
  <div class="AdminHome">
    <div class="wrap">
      <div class="processContainer">
        <div class="processBox">
          <div
            class="contentsList"
            v-for="item in processList"
            v-bind:key="item"
          >
            <span>{{ item.text }}</span>
            <span>{{ item.value }}건</span>
          </div>
        </div>
        <div class="processBox">
          <div
            class="contentsList"
            v-for="item in refundList"
            v-bind:key="item"
          >
            <span>{{ item.text }}</span>
            <span>{{ item.value }}건</span>
          </div>
        </div>
        <div class="processBox">
          <div
            class="contentsList"
            v-for="item in productList"
            v-bind:key="item"
          >
            <span>{{ item.text }}</span>
            <span>{{ item.value }}건</span>
          </div>
        </div>
      </div>
      <div class="statisticsContainer">
        <div class="statisticsBox">
          <div class="header">
            <span>
              매출 통계 [최근 12개월간의 결제완료된 <b>주문 건수</b>의
              합계]</span
            >
          </div>
          <v-sparkline
            :labels="sparkLineLabels"
            :fill="fill"
            :gradient="gradient"
            :line-width="width"
            :show-labels="true"
            :padding="padding"
            :smooth="radius || false"
            :value="orderCnt"
            auto-draw
          ></v-sparkline>
        </div>
        <div class="statisticsBox">
          <div class="header">
            <span>
              매출 통계 [최근 12개월간의 결제완료된 <b>주문 금액</b>의
              합계]</span
            >
          </div>
          <v-sparkline
            :labels="sparkLineLabels"
            :fill="fill"
            :gradient="gradient"
            :line-width="width"
            :show-labels="true"
            :padding="padding"
            :smooth="radius || false"
            :value="salesCnt"
            auto-draw
          ></v-sparkline>
        </div>
      </div>
      <div class="etcContainer">
        <div class="etcBox">
          <div class="header">
            <span> Q&A 미답변({{ noAnswer.length }}건)</span>
          </div>

          <v-card>
            <v-tabs v-model="tabs" centered>
              <v-tab v-for="item in items" :key="item"> {{ item }} </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item>
                <v-card flat>
                  <table class="QnATable">
                    <thead>
                      <th>
                        회원닉네임
                      </th>
                      <th>
                        질문
                      </th>
                      <th>
                        상품명
                      </th>
                      <th>
                        등록일
                      </th>
                    </thead>
                    <tbody>
                      <tr v-for="QnA in QnAList" v-bind:key="QnA">
                        <td>
                          {{ QnA.nickName }}
                        </td>
                        <td>
                          {{ QnA.title }}
                        </td>
                        <td>
                          {{ QnA.product }}
                        </td>
                        <td>
                          {{ QnA.date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <table class="QnATable">
                    <thead>
                      <th>
                        회원닉네임
                      </th>
                      <th>
                        질문
                      </th>
                      <th>
                        상품명
                      </th>
                      <th>
                        등록일
                      </th>
                    </thead>
                    <tbody>
                      <tr v-for="QnA in noAnswer" v-bind:key="QnA">
                        <td>
                          {{ QnA.nickName }}
                        </td>
                        <td>
                          {{ QnA.title }}
                        </td>
                        <td>
                          {{ QnA.product }}
                        </td>
                        <td>
                          {{ QnA.date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <table class="QnATable">
                    <thead>
                      <th>
                        회원닉네임
                      </th>
                      <th>
                        질문
                      </th>
                      <th>
                        상품명
                      </th>
                      <th>
                        등록일
                      </th>
                    </thead>
                    <tbody>
                      <tr v-for="QnA in completedAnswer" v-bind:key="QnA">
                        <td>
                          {{ QnA.nickName }}
                        </td>
                        <td>
                          {{ QnA.title }}
                        </td>
                        <td>
                          {{ QnA.product }}
                        </td>
                        <td>
                          {{ QnA.date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </div>
        <div class="etcBox">
          <div class="header">
            <span> 공지사항</span>
          </div>
          <table class="noticeTable">
            <tbody>
              <tr v-for="notice in reverseNotice" v-bind:key="notice.id">
                <td>
                  {{ notice.id }}
                </td>
                <td>
                  {{ notice.type }}
                </td>
                <td class="noticeTitle">
                  {{ notice.title }}
                </td>
                <td>
                  {{ notice.writer }}
                </td>
                <td>
                  {{ notice.date }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  name: "adminHome",
  data() {
    return {
      fill: true,
      selectedGradient: gradients[4],
      gradients,
      padding: 8,
      radius: 10,
      orderCnt: [
        250,
        600,
        500,
        1300,
        2500,
        3000,
        5000,
        3500,
        2500,
        4000,
        5500,
        8000
      ],
      salesCnt: [
        25000,
        60000,
        50000,
        130000,
        250000,
        300000,
        500000,
        350000,
        250000,
        400000,
        550000,
        800000
      ],
      width: 2,
      sparkLineLabels: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ],
      tabs: null,
      items: ["전체", "미답변", "답변완료"],
      QnAList: [
        {
          id: 0,
          status: "미답변",
          nickName: "안녕하세요",
          title: "환불가능할까요?",
          product: "청바지",
          date: "2020-12-30"
        },
        {
          id: 1,
          status: "답변완료",
          nickName: "닉네임",
          title: "이거 묶음배송 처리 되나요?",
          product: "티셔츠",
          date: "2020-12-15"
        }
      ],
      noticeList: [
        {
          id: 0,
          type: "공통",
          title: "[필독] 브랜디 카테고리 개편 내용 안내",
          writer: "brandi",
          date: "2020-12-30"
        },
        {
          id: 1,
          type: "공통",
          title: "[필독] 담배피지마세요!!!!!!",
          writer: "brandi",
          date: "2020-12-30"
        },
        {
          id: 2,
          type: "공통",
          title: "[이벤트] 연말 인센티브 200% 지급 예정",
          writer: "brandi",
          date: "2020-12-30"
        },
        {
          id: 3,
          type: "공통",
          title: "[필독] 우리 본사를 이전합니다 !",
          writer: "brandi",
          date: "2020-12-30"
        }
      ],
      processList: [
        {
          id: 0,
          text: "상품 준비",
          value: 0
        },
        {
          id: 1,
          text: "배송 준비",
          value: 0
        },
        {
          id: 2,
          text: "배송 중",
          value: 0
        },
        {
          id: 3,
          text: "배송 완료",
          value: 0
        },
        {
          id: 4,
          text: "구매 확정",
          value: 0
        }
      ],
      refundList: [
        {
          id: 0,
          text: "환불 요청",
          value: 0
        },
        {
          id: 1,
          text: "반품 진행",
          value: 0
        },
        {
          id: 2,
          text: "주문 취소중",
          value: 0
        },
        {
          id: 3,
          text: "환불 승인중",
          value: 0
        }
      ],
      productList: [
        {
          id: 0,
          text: "즐겨찾기 수",
          value: 0
        },
        {
          id: 1,
          text: "전체 상품 수",
          value: 0
        },
        {
          id: 2,
          text: "노출 상품 수",
          value: 0
        }
      ]
    };
  },
  methods: {},
  computed: {
    noAnswer: function() {
      return this.QnAList.filter(i => i.status === "미답변");
    },
    completedAnswer: function() {
      return this.QnAList.filter(i => i.status === "답변완료");
    },
    reverseNotice: function() {
      return this.noticeList.slice().reverse();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.AdminHome {
  display: flex;
  justify-content: center;
  width: 90%;
  padding: 10px;
  border-radius: 10px 0 0 10px / 10px 0 0 10px;
  background-color: #fafafa;

  .wrap {
    width: 98%;
    padding: 15px;
    background-color: #fafafa;

    .contentsList {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 5px 15px;
      font-size: 13px;
      margin-bottom: 5px;

      span:nth-child(1) {
        color: #000;
      }
      span:nth-child(2) {
        font-weight: 700;
        color: #000;
      }
    }
    .header {
      display: flex;
      align-items: center;
      height: 30px;
      background-color: #dddddd;
      border-radius: 10px 10px 0 0 / 10px 10px 0 0;

      span {
        margin-left: 10px;
        font-size: 14px;
        font-weight: 500;
      }
    }

    .processContainer {
      display: flex;
      justify-content: space-around;

      .processBox {
        display: flex;
        flex-direction: column;
        width: 360px;
        height: 165px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 10px;
        margin: 0 15px;
      }
    }

    .statisticsContainer {
      display: flex;
      justify-content: space-around;
      margin: 15px 0;

      .statisticsBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 560px;
        height: 270px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 10px;
        margin: 0 15px;
      }
    }
    .etcContainer {
      display: flex;
      justify-content: space-around;
      margin: 15px 0;

      .etcBox {
        display: flex;
        flex-direction: column;
        width: 560px;
        height: 500px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 10px;
        margin: 0 15px;
      }
    }

    .QnATable {
      width: 100%;
      border-spacing: 0;
      margin-top: 5px;

      thead {
        tr {
          th {
            text-align: center;
            font-size: 12px;
            padding: 5px 0;
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 5px 0;
            text-align: center;
            font-size: 12px;
            vertical-align: middle;
          }

          &:hover {
            background-color: #eee;
            cursor: pointer;
          }
        }
      }
    }
    .noticeTable {
      width: 100%;
      border-spacing: 0;
      margin-top: 5px;

      tbody {
        .noticeTitle {
          font-weight: 700;
        }

        tr {
          td {
            padding: 5px 0;
            text-align: center;
            font-size: 12px;
            vertical-align: middle;
          }

          &:nth-child(2n) {
            background-color: #eee;
          }

          &:hover {
            cursor: pointer;
          }
        }
      }

      span {
        color: #222222;
        font-size: 13px;
      }
    }
  }
}
</style>
