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
          <div
            class="rowContent"
            v-for="content in orderInfoTitle"
            v-bind:key="content.id"
          >
            <div class="contentTitle">
              <span>{{ content.text }}</span>
            </div>
            <div class="contentValue">
              <span>{{ content.value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">주문 상세 정보</h4>
        </div>
        <div class="contentBox">
          <div
            class="rowContent"
            v-for="content in orderDetailInfoTitle"
            v-bind:key="content.id"
          >
            <div class="contentTitle">
              <span>{{ content.text }}</span>
            </div>
            <div class="contentValue">
              <span>값</span>
              <span v-if="content.value === 'orderStatus'">
                <button>
                  CS등록
                </button>
              </span>
              <span v-if="content.value === 'recipientPhone'">
                <button>
                  변경
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">상품 정보</h4>
        </div>
        <div class="contentBox">
          <div
            class="rowContent"
            v-for="content in productInfoTitle"
            v-bind:key="content.id"
          >
            <div class="contentTitle">
              <span>{{ content.text }}</span>
            </div>
            <div class="contentValue">
              <span>값</span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">수취자 정보</h4>
        </div>
        <div class="contentBox">
          <div
            class="rowContent"
            v-for="content in receiverInfoTitle"
            v-bind:key="content.id"
          >
            <div class="contentTitle">
              <span>{{ content.text }}</span>
            </div>
            <div class="contentValue">
              <span>값</span>
              <span v-if="content.value === 'recipientPhone'">
                <button>
                  변경
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="containerTitleBox">
          <h4 class="containerTitle">주문상태 변경 이력</h4>
        </div>
        <div class="contentBox">
          <div
            class="rowContent"
            v-for="content in orderInfoHeader"
            v-bind:key="content.id"
          >
            <div class="contentTitle">
              <span>{{ content.text }}</span>
            </div>
            <div class="contentValue">
              <span>값</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btnBox">
        <button>저장</button>
        <button>취소</button>
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
      orderInfoTitle: [
        {
          text: "PG사(결제사)",
          value: "PGCompany"
        },
        {
          text: "주문번호",
          value: "order_No"
        },
        {
          text: "주문일시",
          value: "order_Date"
        },
        {
          text: "외부거래번호",
          value: "outSideTradeNo"
        },
        {
          text: "결제정보",
          value: "paymentInfo"
        },
        {
          text: "총결제금액",
          value: "payedMoney"
        },
        {
          text: "배송비",
          value: "deliveryFee"
        },
        {
          text: "총 포인트결제금액",
          value: "pointMoney"
        },
        {
          text: "쿠폰할인금액",
          value: "couponDiscount"
        }
      ],
      orderDetailInfoTitle: [
        {
          text: "주문 상세 번호",
          value: "orderDetailNo"
        },
        {
          text: "주문 상태",
          value: "orderStatus"
        },
        {
          text: "결제 일시",
          value: "payedDate"
        },
        {
          text: "정산예정일",
          value: "settlementDate"
        },
        {
          text: "주문상세배송비",
          value: "deliveryDetailFee"
        },
        {
          text: "연락처",
          value: "recipientPhone"
        }
      ],
      productInfoTitle: [
        {
          text: "상품번호",
          value: "productNo"
        },
        {
          text: "상품명",
          value: "productName"
        },
        {
          text: "상품 판매가",
          value: "productSalesPrice"
        },
        {
          text: "상품 할인율",
          value: "productDiscountRate"
        },
        {
          text: "브랜드명",
          value: "BrandName"
        },
        {
          text: "옵션정보",
          value: "optionInfo"
        },
        {
          text: "구매수량",
          value: "quantity"
        },
        {
          text: "적립예정포인트",
          value: "point"
        }
      ],
      receiverInfoTitle: [
        {
          text: "회원번호",
          value: "userNo"
        },
        {
          text: "주문자명",
          value: "senderName"
        },
        {
          text: "수령자명",
          value: "recipientName"
        },
        {
          text: "연락처",
          value: "recipientPhone"
        },
        {
          text: "배송지",
          value: "deliveryAddress"
        },
        {
          text: "배송시 요청사항",
          value: "deliveryRequirement"
        }
      ],
      dessert: {}
    };
  },
  watch: {},
  methods: {},
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
      .rowContent {
        display: flex;
        justify-content: flex-start;
        width: 50%;
        border-bottom: 1px solid lightgrey;

        .contentTitle {
          width: 30%;
          margin-left: 15px;
        }

        .contentValue {
          width: 70%;
        }
      }
    }
  }
}
</style>
