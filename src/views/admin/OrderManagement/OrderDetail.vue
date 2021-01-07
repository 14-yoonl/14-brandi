<template>
  <div class="orderDetail">
    <header>
      <span class="mainTitle">주문 상세 관리</span>
      <span class="subTitle">주문 목록/관리</span>
    </header>
    <div class="mainContainer">
      <div class="containerTitleBox">
        <h4 class="containerTitle">주문 상세</h4>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">주문 정보</h4>
        </div>
        <div class="contentBox">
          <div class="rowContent">
            <div class="contentTitle">
              <span>주문 번호 :</span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.order_info[0].order_number }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>주문 일시 :</span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.order_info[0].order_purchased_date }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>총 결제 금액 :</span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.order_info[0].total_price }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">주문 상세 정보</h4>
        </div>
        <div class="contentBox">
          <div class="rowContent">
            <div class="contentTitle">
              <span>주문 상세번호 :</span>
            </div>
            <div class="contentValue">
              <span>{{
                desserts.order_detail_info[0].order_detail_number
              }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>주문 상태 :</span>
            </div>
            <div class="contentValue">
              <select>
                <option>결제 완료</option>
              </select>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>결제 일시 : </span>
            </div>
            <div class="contentValue">
              <span>{{
                desserts.order_detail_info[0].order_item_purchased_date
              }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>정산예정일 : </span>
            </div>
            <div class="contentValue">
              <span>아직 구매확정이 되지 않은 주문건입니다.</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>연락처 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.order_detail_info[0].customer_phone }}</span>
              <span
                ><button
                  class="changePhoneNumberBtn"
                  v-on:click="handleChangePhoneNumber"
                >
                  변경
                </button></span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">상품 정보</h4>
        </div>
        <div class="contentBox">
          <div class="rowContent">
            <div class="contentTitle">
              <span>상품번호 :</span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.product_info[0].product_number }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>상품명 :</span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.product_info[0].product_name }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>상품 판매가 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.product_info[0].price }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>상품 할인율 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.product_info[0].discount_rate * 100 }}%</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>브랜드명 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.product_info[0].brand_name }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>옵션정보 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.product_info[0].option_information }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>구매수량 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.product_info[0].qauntity }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">수취자 정보</h4>
        </div>
        <div class="contentBox">
          <div class="rowContent">
            <div class="contentTitle">
              <span>회원번호 :</span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.recipient_info[0].user_id }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>주문자명 :</span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.recipient_info[0].customer_name }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>수령자명 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.recipient_info[0].recipient_name }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>연락처 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.recipient_info[0].recipient_phone }}</span>
              <span
                ><button
                  class="changePhoneNumberBtn"
                  v-on:click="handleChangePhoneNumber"
                >
                  변경
                </button></span
              >
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>배송지 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.recipient_info[0].destination }}</span>
            </div>
          </div>
          <div class="rowContent">
            <div class="contentTitle">
              <span>배송시 요청사항 : </span>
            </div>
            <div class="contentValue">
              <span>{{ desserts.recipient_info[0].delivery_memo }}</span>
              <span
                ><button
                  class="changeDestinationBtn"
                  v-on:click="handleChangeDestination"
                >
                  배송지 변경
                </button></span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">주문상태 변경 이력</h4>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                날짜
              </th>
              <th>
                주문상태
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="history in desserts.order_status_history"
              v-bind:key="history.id"
            >
              <td>
                {{ history.date }}
              </td>
              <td>
                {{ history.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btnBox">
        <button class="saveBtn" v-on:click="handleSaveBtn">저장</button>
        <button @click="$router.go(-1)" class="cancelBtn">취소</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "orderDetail",
  data() {
    return {
      desserts: {
        order_detail_info: [
          {
            customer_phone: "12345667890",
            order_detail_number: "oidt00001",
            order_item_id: 1,
            order_item_purchased_date: "2020-12-31 13:25:03",
            status: "배송중"
          }
        ],
        order_info: [
          {
            order_id: 1,
            order_number: "20201225000000001",
            order_purchased_date: "2020-12-31 13:25:03",
            total_price: 18000.0
          }
        ],
        order_status_history: [
          {
            date: "2021-01-03 01:26:05",
            status: "배송중"
          },
          {
            date: "2020-12-31 13:25:01",
            status: "상품준비"
          }
        ],
        product_info: [
          {
            brand_name: "나는셀러3",
            discount_rate: 0.1,
            option_information: "Black/Free",
            price: "10000 원 (할인가 9000원)",
            product_name: "성보의하루1",
            product_number: "P0000000000000000001",
            qauntity: 1
          }
        ],
        recipient_info: [
          {
            customer_name: "user1",
            delivery_memo: "문 앞에 놓아주세요",
            destination: "서울시 강남 위코드 아파 (123321)",
            recipient_name: "둘리",
            recipient_phone: "01022222222",
            user_id: 102
          }
        ],
        updated_at_time: "2021-01-03 00:42:12"
      }
    };
  },
  watch: {},
  methods: {
    getData: function() {
      axios
        .get(
          `http://192.168.40.107:5000/admin/orders/detail/${this.order_detail_number}`
        ) 
        .then(res => {
          this.desserts = res.data.result;
        });
    },
    handleChangePhoneNumber: function() {
      alert("번호 바꿀래?");
    },
    handleChangeDestination: function() {
      alert("위치 바꿀래?");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.orderDetail {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px 0 0 10px / 10px 0 0 10px;
  background-color: #f3f4f7;

  header {
    .mainTitle {
      color: #666666;
      font-size: 26px;
      font-weight: 300;
    }
    .subTitle {
      color: #888888;
      font-size: 14px;
    }
  }

  .mainContainer {
    border: 1px solid #999999;

    .containerTitleBox {
      display: flex;
      align-items: center;
      height: 38px;
      background-color: #eeeeee;

      .containerTitle {
        margin-left: 10px;
        color: #333333;
      }
    }

    .contentBox {
      display: flex;
      flex-wrap: wrap;
    }

    .orderInfoBox {
      width: 98%;
      margin: 10px auto;
      border: 1px solid #999999;

      span {
        font-size: 13px;
      }
      table {
        width: 98%;
        margin: 10px auto;
        border-spacing: 0;
        border: 1px solid lightgrey;

        th,
        td {
          padding-left: 10px;
          border-bottom: 1px solid lightgrey;
          padding-top: 5px;
        }

        thead {
          text-align: left;
          background-color: #eeeeee;
          font-size: 14px;
        }

        tbody {
          tr {
            td {
              padding: 5px 0px;
              font-size: 13px;
              text-align: left;
              vertical-align: middle;
              padding-left: 10px;
            }
          }
          td:nth-child(1) {
            width: 200px;
          }
        }
      }
      .rowContent {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 50%;
        height: 35px;
        border-bottom: 1px solid lightgrey;

        .contentTitle {
          width: 30%;
          margin-left: 15px;
        }

        .contentValue {
          width: 70%;
        }
      }
      .changePhoneNumberBtn {
        margin-left: 30px;
        background-color: #c9302c;
        border: 1px solid #ac2925;
        border-radius: 3px;
        color: white;
        padding: 3px 6px;
        outline: none;
      }
      .changeDestinationBtn {
        margin-left: 30px;
        background-color: #31b0d5;
        border: 1px solid #269abc;
        border-radius: 3px;
        color: white;
        outline: none;
        padding: 3px 6px;
      }
    }

    .btnBox {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;

      .saveBtn {
        margin: 0px 3px;
        padding: 6px 12px;
        background-color: #449d44;
        color: #ffffff;
        border-radius: 5px;
      }

      .cancelBtn {
        margin: 0px 3px;
        padding: 6px 12px;
        background-color: #ffffff;
        border: 1px solid lightgrey;
        color: #333333;
        border-radius: 5px;
      }
    }
  }
}
</style>
