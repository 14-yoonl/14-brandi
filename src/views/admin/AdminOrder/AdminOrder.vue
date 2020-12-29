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
          <option value="" disabled>조건을 선택해주세요 ▼ </option>
          <option v-for="condition in searchCondition">
            {{ condition.text }}
          </option>
        </select>
        <input
          v-model="searchInputData"
          class="searchInputBox"
          placeholder="검색어를 입력하세요"
        />
        <span>{{ searchInputData }}</span>
      </div>
      <div class="filterList">
        <span class="filterTitle">결제완료일 : </span>
        <input
          type="radio"
          name="payedDate"
          value="전체"
          id="payedDateAll"
          v-model="payedCompletedDate"
        />
        <label for="payedDateAll">전체</label>

        <input
          type="radio"
          name="payedDate"
          value="오늘"
          id="today"
          v-model="payedCompletedDate"
        />
        <label for="today">오늘</label>
        <input
          type="radio"
          name="payedDate"
          value="3일"
          id="3days"
          v-model="payedCompletedDate"
          checked
        />
        <label for="3days">3일</label>
        <input
          type="radio"
          name="payedDate"
          value="1주일"
          id="1week"
          v-model="payedCompletedDate"
        />
        <label for="1week">1주일</label>
        <input
          type="radio"
          name="payedDate"
          value="1개월"
          id="1month"
          v-model="payedCompletedDate"
        />
        <label for="1month">1개월</label>
        <input
          type="radio"
          name="payedDate"
          value="3개월"
          id="3month"
          v-model="payedCompletedDate"
        />
        <label for="3month">3개월</label>
        <span>{{ payedCompletedDate }}</span>
      </div>
      <div class="filterList">
        <span class="filterTitle">셀러속성 : </span>
        <input
          type="radio"
          name="sellerAttribute"
          value="전체"
          id="sellerAttributeAll"
          v-model="sellerAttribute"
          checked
        />
        <label for="sellerAttributeAll">전체</label>
        <input
          type="radio"
          name="sellerAttribute"
          value="쇼핑몰"
          id="shoppingmall"
          v-model="sellerAttribute"
        />
        <label for="shoppingmall">쇼핑몰</label>
        <input
          type="radio"
          name="sellerAttribute"
          value="마켓"
          id="market"
          v-model="sellerAttribute"
        />
        <label for="market">마켓</label>
        <input
          type="radio"
          name="sellerAttribute"
          value="로드샵"
          id="roadShop"
          v-model="sellerAttribute"
        />
        <label for="roadShop">로드샵</label>
        <input
          type="radio"
          name="sellerAttribute"
          value="디자이너브랜드"
          id="designerBrand"
          v-model="sellerAttribute"
        />
        <label for="designerBrand">디자이너브랜드</label>
        <input
          type="radio"
          name="sellerAttribute"
          value="뷰티"
          id="beauty"
          v-model="sellerAttribute"
        />
        <label for="beauty">뷰티</label>
        <span>{{ sellerAttribute }}</span>
      </div>
      <div class="filterList">
        <span class="filterTitle">셀러구분 : </span>
        <input
          type="radio"
          name="sellerType"
          value="전체"
          id="sellerTypeAll"
          v-model="sellerType"
          checked
        />
        <label for="sellerTypeAll">전체</label>
        <input
          type="radio"
          name="sellerType"
          value="일반"
          id="normalSeller"
          v-model="sellerType"
        />
        <label for="normalSeller">일반</label>
        <input
          type="radio"
          name="sellerType"
          value="헬피"
          id="helpySeller"
          v-model="sellerType"
        />
        <label for="helpySeller">헬피</label>
        <span>{{ sellerType }}</span>
      </div>
      <div class="filterList">
        <span class="filterTitle">배송구분 : </span>
        <input
          type="radio"
          name="deliveryType"
          value="전체"
          id="deliveryTypeAll"
          v-model="deliveryType"
          checked
        />
        <label for="deliveryTypeAll">전체</label>
        <input
          type="radio"
          name="deliveryType"
          value="일반배송"
          id="normalDelivery"
          v-model="deliveryType"
        />
        <label for="normalDelivery">일반배송</label>
        <input
          type="radio"
          name="deliveryType"
          value="오늘출발"
          id="sendToday"
          v-model="deliveryType"
        />
        <label for="sendToday">오늘출발</label>
        <input
          type="radio"
          name="deliveryType"
          value="새벽도착"
          id="arriveDawn"
          v-model="deliveryType"
        />
        <label for="arriveDawn">새벽도착</label>
        <input
          type="radio"
          name="deliveryType"
          value="저녁도착"
          id="arriveEvening"
          v-model="deliveryType"
        />
        <label for="arriveEvening">저녁도착</label>
        <span>{{ deliveryType }}</span>
      </div>
      <div class="searchBtnBox">
        <v-btn elevation="2" md color="primary" v-on:click="filterSearch"
          >검색</v-btn
        >
        <v-btn elevation="2" md v-on:click="filterReset">초기화</v-btn>
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
                  v-model="selectedItem"
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
      filterSelectedCondition: "",
      searchInputData: "",
      payedCompletedDate: "3일",
      sellerAttribute: "전체",
      sellerType: "전체",
      deliveryType: "전체",
      selectedItem: [],
      currentDate: "",
      searchCondition: [
        {
          text: "주문번호",
          value: "orderNo"
        },
        {
          text: "주문상세번호",
          value: "orderDetailNo"
        },
        {
          text: "---------------",
          value: ""
        },
        {
          text: "주문자명",
          value: "senderName"
        },
        {
          text: "핸드폰번호",
          value: "senderPhone"
        },
        {
          text: "셀러명",
          value: "sellerName"
        },
        {
          text: "상품명",
          value: "productName"
        }
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
        { text: "주문상태", value: "orderStatus" }
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
          orderStatus: "상품준비"
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
          orderStatus: "상품준비"
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
          orderStatus: "상품준비"
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
          orderStatus: "상품준비"
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
          orderStatus: "상품준비"
        }
      ]
    };
  },
  methods: {
    filterSearch: function(event) {
      alert("검색 완료!");
    },
    filterReset: function(event) {
      (this.filterSelectedCondition = ""),
        (this.searchInputData = ""),
        (this.payedCompletedDate = "3일"),
        (this.sellerAttribute = "전체"),
        (this.sellerType = "전체"),
        (this.deliveryType = "전체");
    },
    prepareOrder: function(event) {
      alert(`${this.selectedItem.length}개의 주문이 배송준비처리 되었습니다 !`);
    },
    cancelOrder: function(event) {
      alert(`${this.selectedItem.length}개의 주문이 취소되었습니다 !`);
    },
    getToday: function() {
      let currentDate = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
      this.currentDate = currentDate;
    }
  },
  computed: {
    selectAll: {
      get: function() {
        return this.desserts
          ? this.selectedItem.length === this.desserts.length
          : false;
      },
      set: function(value) {
        let selectedItem = [];
        if (value) {
          this.desserts.forEach(order => {
            selectedItem.push(order.orderNo);
          });
        }
        this.selectedItem = selectedItem;
      }
    }
  },
  mounted() {
    this.getToday();
  }
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
    height: 320px;
    margin: 10px auto;
    background-color: white;
    border-radius: 10px;

    .select {
      width: 100px;
      height: 30px;
    }

    .searchCondition {
      width: 130px;
      height: 30px;
      margin-right: 20px;
      font-size: 12px;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      padding: 0 5px;

      option {
        text-align: center;
      }
    }

    .searchInputBox {
      width: 300px;
      height: 30px;
      border: 1px solid #e5e5e5;
      padding-left: 10px;
      border-radius: 4px;
      color: #333333;
      font-size: 13px;
    }

    .filterList {
      margin: 15px;
      :hover {
        cursor: pointer;
      }

      input[type="radio"] {
        display: none;
      }

      input[type="radio"] + label {
        display: inline-block;
        padding: 5px 0px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        font-size: 11px !important;
        width: 80px;
        text-align: center;
      }

      input[type="radio"]:radio + label {
        background-image: none;
        background-color: #3598dc;
        color: #fff;
      }

      input[type="radio"]:checked + label {
        background-color: #2b80d4;
        border-color: #2b80d4;
        color: #ffffff;
        font-weight: 700;
      }

      .filterTitle {
        margin: 0 20px;
        font-size: 14px;
      }
    }
    .searchBtnBox {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      .v-btn {
        width: 100px;
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
