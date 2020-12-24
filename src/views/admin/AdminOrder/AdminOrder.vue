<template>
  <div class="AdminOrder">
    <div class="header">
      <div class="title">
        <h1 class="mainTitle">주문 관리</h1>
        <span class="subTitle">상품준비 관리</span>
      </div>
      <div>
        <p class="notice">
          ( 상품준비 단계에서는 구매회원의 주문취소가 가능하며, 배송준비단계로
          처리할 경우 3영업일 동안은 구매회원의 주문취소가 불가능합니다. )
        </p>
        <p class="notice">
          ( 배송준비로 변경하신 후 3영업일 이내로 상품 배송이 시작되지 않을 경우
          구매회원의 주문취소가 가능하며 이에 따른 책임은 판매자 회원에게
          있습니다. (전자상거래법 제 15조 1항에 근거) )
        </p>
      </div>
    </div>
    <div class="filter">
      <div class="filterList">
        <span class="filterTitle">검색조건 : </span>
        <select v-model="filterSelectedCondition" class="searchCondition">
          <option value="">조건을 선택해주세요</option>
          <option v-for="condition in searchCondition">
            {{ condition.text }}
          </option>
        </select>
        <input
          v-model="searchInputData"
          class="searchInputBox"
          placeholder="검색어를 입력하세요"
        />
      </div>
      <div class="filterList">
        <span class="filterTitle">결제완료일 : </span>
        <input type="radio" v-for="completedDateValue in completedDateList">
        {{ completedDateValue}}
      
        
      </div>
      <div class="filterList">
        <span class="filterTitle">셀러속성 : </span>
        <v-btn elevation="2" small color="primary" class="{active}">전체</v-btn>
        <v-btn elevation="2" small>쇼핑몰</v-btn>
        <v-btn elevation="2" small>마켓</v-btn>
        <v-btn elevation="2" small>로드샵</v-btn>
        <v-btn elevation="2" small>디자이너브랜드</v-btn>
        <v-btn elevation="2" small>재너럴브랜드</v-btn>
        <v-btn elevation="2" small>뷰티</v-btn>
      </div>
      <div class="filterList">
        <span class="filterTitle">셀러구분 : </span>
        <v-btn elevation="2" small color="primary">전체</v-btn>
        <v-btn elevation="2" small>일반</v-btn>
        <v-btn elevation="2" small>헬피</v-btn>
      </div>
      <div class="filterList">
        <span class="filterTitle">배송구분 : </span>
        <v-btn elevation="2" small color="primary">전체</v-btn>
        <v-btn elevation="2" small>일반배송</v-btn>
        <v-btn elevation="2" small>오늘출발</v-btn>
        <v-btn elevation="2" small>새벽도착</v-btn>
        <v-btn elevation="2" small>저녁도착</v-btn>
      </div>
      <div class="searchBtnBox">
        <v-btn elevation="2" md color="primary">검색</v-btn>
        <v-btn elevation="2" md>초기화</v-btn>
      </div>
    </div>
    <div class="contentList">
      <div class="handlePrepareBtns">
        <span>전체 조회건 수 : {{ desserts.length }} 건</span>
        <v-btn elevation="1" x-small color="primary" v-on:click="prepareOrder"
          >배송준비처리</v-btn
        >
        <v-btn elevation="1" x-small color="primary" v-on:click="cancelOrder"
          >주문취소처리</v-btn
        >
      </div>
      <div class="tableContainer">
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
            <tr v-for="order in desserts">
              <td>
                <v-checkbox
                  color="success"
                  :value="order.orderNo"
                  v-model="selected"
                  hide-details
                ></v-checkbox>
              </td>
              <td>
                {{ order.orderNo }}
              </td>
              <td>
                {{ order.paidDate }}
              </td>
              <td>
                {{ order.orderDetailNo }}
              </td>
              <td>
                {{ order.sellerName }}
              </td>
              <td>
                {{ order.sellerType }}
              </td>
              <td>
                {{ order.helpyType }}
              </td>
              <td>
                {{ order.deliveryType }}
              </td>
              <td>
                {{ order.productName }}
              </td>
              <td>
                {{ order.options }}
              </td>
              <td>
                {{ order.optionsPrice }}
              </td>
              <td>
                {{ order.quantity }}
              </td>
              <td>
                {{ order.senderName }}
              </td>
              <td>
                {{ order.senderPhone }}
              </td>
              <td>
                {{ order.paidPrice }}
              </td>
              <td>
                {{ order.usedPoint }}
              </td>
              <td>
                {{ order.discountCoupon }}
              </td>
              <td>
                {{ order.paymentType }}
              </td>
              <td>
                {{ order.orderStatus }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="handlePrepareBtns">
        <v-btn elevation="1" x-small color="primary" v-on:click="prepareOrder"
          >배송준비처리</v-btn
        >
        <v-btn elevation="1" x-small color="primary" v-on:click="cancelOrder"
          >주문취소처리</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchInputData: "",
      filterSelectedCondition: "",
      selected: [],
      completedDate: "",
      completedDateList: [
        { text: "전체", value: "allDays" },
        { text: "오늘", value: "today" },
        { text: "3일", value: "3days" },
        { text: "1주일", value: "1week" },
        { text: "1개월", value: "1month" },
        { text: "3개월", value: "3month" },
      ],
      searchCondition: [
        {
          text: "주문번호",
          value: "orderNo",
        },
        {
          text: "주문상세번호",
          value: "orderDetailNo",
        },
        {
          text: "주문자명",
          value: "senderName",
        },
        {
          text: "핸드폰번호",
          value: "senderPhone",
        },
        {
          text: "셀러명",
          value: "sellerName",
        },
        {
          text: "상품명",
          value: "productName",
        },
      ],
      headers: [
        { text: "주문번호", value: "orderNo" },
        { text: "결제일자", value: "paidDate" },
        { text: "주문상세번호", value: "orderDetailNo" },
        { text: "셀러명", value: "sellerName" },
        { text: "셀러구분", value: "sellerType" },
        { text: "헬피구분", value: "helpyType" },
        { text: "배송구분", value: "deliveryType" },
        { text: "상품명", value: "productName" },
        { text: "옵션정보", value: "options" },
        { text: "옵션추가금액", value: "optionsPrice" },
        { text: "수량", value: "quantity" },
        { text: "주문자명", value: "senderName" },
        { text: "핸드폰번호", value: "senderPhone" },
        { text: "결제금액", value: "paidPrice" },
        { text: "사용포인트", value: "usedPoint" },
        { text: "쿠폰할인", value: "discountCoupon" },
        { text: "결제수단", value: "paymentType" },
        { text: "주문상태", value: "orderStatus" },
      ],
      desserts: [
        {
          orderNo: 20201218000028012,
          paidDate: "2020-12-18 17:01:45",
          orderDetailNo: "B202012180001C001",
          sellerName: "모디무드",
          sellerType: "헬피셀러",
          helpyType: "헬피1",
          deliveryType: "일반배송",
          productName: "쫀쫀 심플 기모 목폴라(6color)_미우블랑",
          options: "아이보리/free",
          optionsPrice: 0,
          quantity: 1,
          senderName: "장호철",
          senderPhone: "010-8516-1399",
          paidPrice: 9800,
          usedPoint: 0,
          discountCoupon: 0,
          paymentType: "네이버페이주문형(신용카드)",
          orderStatus: "상품준비",
        },
        {
          orderNo: 20201218000021230,
          paidDate: "2020-12-18 17:01:45",
          orderDetailNo: "B202012180001C001",
          sellerName: "모디무드",
          sellerType: "헬피셀러",
          helpyType: "헬피1",
          deliveryType: "일반배송",
          productName: "쫀쫀 심플 기모 목폴라(6color)_미우블랑",
          options: "아이보리/free",
          optionsPrice: 0,
          quantity: 1,
          senderName: "장호철",
          senderPhone: "010-8516-1399",
          paidPrice: 9800,
          usedPoint: 0,
          discountCoupon: 0,
          paymentType: "네이버페이주문형(신용카드)",
          orderStatus: "상품준비",
        },
        {
          orderNo: 20201218000028000,
          paidDate: "2020-12-18 17:01:45",
          orderDetailNo: "B202012180001C001",
          sellerName: "모디무드",
          sellerType: "헬피셀러",
          helpyType: "헬피1",
          deliveryType: "일반배송",
          productName: "쫀쫀 심플 기모 목폴라(6color)_미우블랑",
          options: "아이보리/free",
          optionsPrice: 0,
          quantity: 1,
          senderName: "장호철",
          senderPhone: "010-8516-1399",
          paidPrice: 9800,
          usedPoint: 0,
          discountCoupon: 0,
          paymentType: "네이버페이주문형(신용카드)",
          orderStatus: "상품준비",
        },
        {
          orderNo: 20201218000028000,
          paidDate: "2020-12-18 17:01:45",
          orderDetailNo: "B202012180001C001",
          sellerName: "모디무드",
          sellerType: "헬피셀러",
          helpyType: "헬피1",
          deliveryType: "일반배송",
          productName: "쫀쫀 심플 기모 목폴라(6color)_미우블랑",
          options: "아이보리/free",
          optionsPrice: 0,
          quantity: 1,
          senderName: "장호철",
          senderPhone: "010-8516-1399",
          paidPrice: 9800,
          usedPoint: 0,
          discountCoupon: 0,
          paymentType: "네이버페이주문형(신용카드)",
          orderStatus: "상품준비",
        },
        {
          orderNo: 20201218000028000,
          paidDate: "2020-12-18 17:01:45",
          orderDetailNo: "B202012180001C001",
          sellerName: "모디무드",
          sellerType: "헬피셀러",
          helpyType: "헬피1",
          deliveryType: "일반배송",
          productName: "쫀쫀 심플 기모 목폴라(6color)_미우블랑",
          options: "아이보리/free",
          optionsPrice: 0,
          quantity: 1,
          senderName: "장호철",
          senderPhone: "010-8516-1399",
          paidPrice: 9800,
          usedPoint: 0,
          discountCoupon: 0,
          paymentType: "네이버페이주문형(신용카드)",
          orderStatus: "상품준비",
        },
      ],
    };
  },
  methods: {
    prepareOrder: function (event) {
      alert(`selected.length개의 주문이 배송준비처리 되었습니다 !`);
    },
    cancelOrder: function (event) {
      alert(`selected.length개의 주문이 취소되었습니다 !`);
    },
  },
  computed: {
    selectAll: {
      get: function () {
        return this.desserts
          ? this.selected.length === this.desserts.length
          : false;
      },
      set: function (value) {
        var selected = [];
        if (value) {
          this.desserts.forEach((order) => {
            selected.push(order.orderNo);
          });
        }
        this.selected = selected;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.AdminOrder {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: 10px 0 0 10px / 10px 0 0 10px;
  background-color: #f3f4f7;

  .header {
    background-color: white;
    padding: 10px 10px 0 10px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    .title {
      display: flex;
      align-items: center;
      margin: 5px;

      .mainTitle {
        font-size: 28px;
      }

      .subTitle {
        margin-left: 5px;
        margin-bottom: -10px;
        font-size: 16px;
      }
    }

    .notice {
      margin: 5px;
      color: #888888;
      font-size: 13px;
    }
  }

  .filter {
    width: 100%;
    height: 300px;
    margin: 10px auto;
    background-color: white;
    border-radius: 10px;

    .select {
      width: 100px;
      height: 30px;
    }

    .searchCondition {
      line-height: 30px;
      margin-right: 20px;
      font-size: 16px;
    }

    .searchInputBox {
      width: 310px;
      height: 30px;
      padding: 6px 10px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      color: #333333;
      font-size: 13px;
    }

    .filterList {
      margin-bottom: 10px;
      .filterTitle {
        margin: 0 20px;
        font-size: 14px;
      }
      .v-btn {
        margin: 0 5px;
      }
    }
    .searchBtnBox {
      display: flex;
      justify-content: center;

      .v-btn {
        width: 100px;
        margin: 0 5px;
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

    .tableContainer {
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }

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

      th,
      td {
        border: 1px solid #dddddd;
      }

      thead {
        background-color: #eee;

        tr {
          th {
            text-align: center;
            font-size: 16px;
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
          }
        }
      }
    }
  }
}
</style>
