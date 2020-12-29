<template>
  <div class="AdminOrder">
    <AdminHeader>
      <template v-slot:title>
        <h1 class="mainTitle">주문 관리</h1>
        <span class="subTitle">상품준비 관리</span>
      </template>
      <template v-slot:notice>
        <p class="notice">
          ( 상품준비 단계에서는 구매회원의 주문취소가 가능하며, 배송준비단계로
          처리할 경우 3영업일 동안은 구매회원의 주문취소가 불가능합니다. )
        </p>
        <p class="notice">
          ( 배송준비로 변경하신 후 3영업일 이내로 상품 배송이 시작되지 않을 경우
          구매회원의 주문취소가 가능하며 이에 따른 책임은 판매자 회원에게
          있습니다. (전자상거래법 제 15조 1항에 근거) )
        </p>
      </template>
    </AdminHeader>
    <div class="filterContainer">
      <div class="filterList">
        <div class="filterTitle">
          <span>검색조건 : </span>
        </div>
        <div class="filterBtnsGroup">
          <select v-model="filterSelectedCondition" class="searchCondition">
            <option value="" disabled>조건을 선택해주세요 ▼ </option>
            <!-- <option value="orderNo">주문번호</option>
            <option value="orderDetailNo">주문상세번호</option>
            <option value="" disabled>--------------------</option>
            <option value="senderName">주문자명</option>
            <option value="senderPhone">핸드폰번호</option>
            <option value="" disabled>--------------------</option>
            <option value="sellerName">셀러명</option>
            <option value="productName">상품명</option> -->
            <option
              v-for="(condition, disabled) in searchCondition"
              :disabled="condition.disabled"
              v-bind:key="condition.id"
            >
              {{ condition.text }}
            </option>
          </select>
        </div>
        <input
          v-model="searchInputData"
          class="searchInputBox"
          placeholder="검색어를 입력하세요"
        />
        <span>{{ searchInputData }}</span>
      </div>
      <div class="filterList">
        <div class="filterTitle">
          <span>결제완료일 : </span>
        </div>
        <div class="filterBtnsGroup">
          <!-- <input
            v-for="(date, name, value, id, model) in payedCompletedDateList"
            v-bind:key="date.id"
            type="radio"
            :name="name"
            :value="value"
            id="id"
            model="payedCompletedDate"
          />
          <label for="id">{{ date.value }}</label> -->
          <!-- <input
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
            value="0"
            id="today"
            v-model="payedCompletedDate"
          />
          <label for="today">오늘</label>
          <input
            type="radio"
            name="payedDate"
            value="3"
            id="3days"
            v-model="payedCompletedDate"
            checked
          />
          <label for="3days">3일</label>
          <input
            type="radio"
            name="payedDate"
            value="7"
            id="1week"
            v-model="payedCompletedDate"
          />
          <label for="1week">1주일</label>
          <input
            type="radio"
            name="payedDate"
            value="30"
            id="1month"
            v-model="payedCompletedDate"
          />
          <label for="1month">1개월</label>
          <input
            type="radio"
            name="payedDate"
            value="90"
            id="3month"
            v-model="payedCompletedDate"
          />
          <label for="3month">3개월</label> -->
        </div>
        <span>{{ payedCompletedDate }}</span>
        <input type="date" v-model="getStartedDate" />
        <input type="date" v-model="currentDate" />
        <span>{{ startedDate }}</span>
        <!-- <v-date-picker v-model="dates" range></v-date-picker> -->
      </div>
      <div class="filterList">
        <div class="filterTitle">
          <span>셀러속성 : </span>
        </div>
        <div class="filterBtnsGroup">
          <input
            type="checkbox"
            name="sellerAttribute"
            value="전체"
            id="sellerAttributeAll"
            v-model="sellerAttribute"
          />
          <!-- v-model="selectAllSellerAttribute" -->
          <label for="sellerAttributeAll">전체</label>
          <input
            type="checkbox"
            name="sellerAttribute"
            value="쇼핑몰"
            id="shoppingmall"
            v-model="sellerAttribute"
          />
          <label for="shoppingmall">쇼핑몰</label>
          <input
            type="checkbox"
            name="sellerAttribute"
            value="마켓"
            id="market"
            v-model="sellerAttribute"
          />
          <label for="market">마켓</label>
          <input
            type="checkbox"
            name="sellerAttribute"
            value="로드샵"
            id="roadShop"
            v-model="sellerAttribute"
          />
          <label for="roadShop">로드샵</label>
          <input
            type="checkbox"
            name="sellerAttribute"
            value="디자이너브랜드"
            id="designerBrand"
            v-model="sellerAttribute"
          />
          <label for="designerBrand">디자이너브랜드</label>
          <input
            type="checkbox"
            name="sellerAttribute"
            value="뷰티"
            id="beauty"
            v-model="sellerAttribute"
          />
          <label for="beauty">뷰티</label>
          <span>{{ sellerAttribute }}</span>
        </div>
      </div>
      <div class="filterList">
        <div class="filterTitle">
          <span>셀러구분 : </span>
        </div>
        <div class="filterBtnsGroup">
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
        </div>
        <span>{{ sellerType }}</span>
      </div>
      <div class="filterList">
        <div class="filterTitle">
          <span>배송구분 : </span>
        </div>
        <div class="filterBtnsGroup">
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
        </div>
        <span>{{ deliveryType }}</span>
      </div>
      <div class="searchBtnBox">
        <v-btn elevation="2" md color="primary" v-on:click="filterSearch"
          >검색</v-btn
        >
        <v-btn elevation="2" md v-on:click="filterReset">초기화</v-btn>
      </div>
    </div>
    <div class="tableContainer">
      <div class="tableContainerHeaderBtns">
        <div class="headerLeft">
          <span class="totalQuantity"
            >전체 조회건 수 : {{ desserts.length }} 건</span
          >
          <v-btn elevation="1" x-small color="primary" v-on:click="prepareOrder"
            >배송준비처리</v-btn
          >
          <v-btn elevation="1" x-small color="primary" v-on:click="cancelOrder"
            >주문취소처리</v-btn
          >
        </div>
        <div class="headerRight">
          <span>{{ itemsPerPage }}</span>
          <select
            v-model="itemsPerPage"
            class="selectItemsPerPage"
            @change="handleItemsPerPage"
          >
            <option value="10">10개씩 보기</option>
            <option value="20">20개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="50">50개씩 보기</option>
            <option value="150">150개씩 보기</option>
          </select>
        </div>
      </div>
      <div class="tableContainer">
        <table>
          <thead>
            <tr>
              <th>
                <v-checkbox
                  color="success"
                  hide-details
                  v-model="selectAllItems"
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
                  :value="order.orderDetailNo"
                  v-model="selectedItems"
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
      <div class="tableContainerFooterBtns">
        <v-btn elevation="1" x-small color="primary" v-on:click="prepareOrder"
          >배송준비처리</v-btn
        >
        <v-btn elevation="1" x-small color="primary" v-on:click="cancelOrder"
          >주문취소처리</v-btn
        >
        <span>{{ selectedItems }}</span>
        <v-pagination v-model="currentPage" :length="5"></v-pagination>
        <span>{{ currentPage }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import AdminHeader from "../../../components/common/adminDataTable/AdminHeader";
import AdminFilter from "../../../components/common/adminDataTable/AdminFilter";

export default {
  name: "adminOrder",
  components: { AdminHeader, AdminFilter },
  data() {
    return {
      filterSelectedCondition: "",
      searchInputData: "",
      payedCompletedDate: "3",
      sellerAttribute: [],
      selectedsellerAttribute: [],
      sellerType: "전체",
      deliveryType: "전체",
      selectedItems: [],
      startedDate: "",
      currentDate: "",
      currentPage: 1,
      itemsPerPage: 30,
      searchCondition: [
        { text: "주문번호", value: "orderNo", disabled: false },
        { text: "주문상세번호", value: "orderDetailNo", disabled: false },
        { text: "--------------------", value: "", disabled: true }
      ],
      payedCompletedDateList: [
        {
          name: "payedDate",
          value: "전체",
          id: "payedDateAll",
          model: "payedCompletedDate"
        },
        {
          name: "payedDate",
          value: "오늘",
          id: "today",
          model: "payedCompletedDate"
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
      desserts: [
        {
          orderNo: 20201218000028012,
          paidDate: "2020-12-18 17:01:45",
          orderDetailNo: "B202012180001C100",
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
          orderDetailNo: "B202012180001C121",
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
          orderDetailNo: "B202012180001C521",
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
          orderDetailNo: "B202012180001C541",
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
          orderDetailNo: "B202012180001C873",
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
        (this.payedCompletedDate = "3"),
        (this.sellerAttribute = ["전체"]),
        (this.sellerType = "전체"),
        (this.deliveryType = "전체");
    },
    prepareOrder: function(event) {
      if (this.selectedItems.length === 0) {
        alert("선택된 것이 아무 것도 없습니다");
      } else {
        alert(
          `${this.selectedItems.length}개의 주문이 배송준비처리 되었습니다 !`
        );
      }
    },
    cancelOrder: function(event) {
      if (this.selectedItems.length === 0) {
        alert("선택된 것이 아무 것도 없습니다");
      } else {
        alert(`${this.selectedItems.length}개의 주문이 취소되었습니다 !`);
      }
    },
    handleItemsPerPage: function() {
      console.log(`아이템 갯수가 ${this.itemsPerPage}로 바뀜 `);
    },
    getToday: function() {
      let currentDate = new Date().toJSON().slice(0, 10);
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let day = today.getDate();
      this.currentDate = currentDate;
      // alert(`year: ${year}, month: ${month}, day: ${day}`);
    }
  },
  computed: {
    getStartedDate: {
      function() {
        let startedDate = this.startedDate;
        let payedCompletedDate = parseInt(this.payedCompletedDate);
        let today = new Date();
        let year = parseInt(today.getFullYear());
        let month = parseInt(today.getMonth());
        let day = parseInt(today.getDate());

        return (this.startedDate = `${year}-${month}-${day -
          payedCompletedDate}`);
      }
    },

    // selectAllSellerAttribute: {
    //   get: function() {
    //     return this.sellerAttribute ? this.sellerAttribute.length === 6 : false;
    //   },
    //   set: function(value) {
    //     let sellerAttribute = [];
    //     if (value) {
    //       this.sellerAttribute.forEach(attribute => {
    //         sellerAttribute.push(attribute.value);
    //       });
    //     }
    //     this.sellerAttribute = sellerAttribute;
    //   }
    // },

    selectAllItems: {
      get: function() {
        return this.desserts
          ? this.selectedItems.length === this.desserts.length
          : false;
      },
      set: function(value) {
        let selectedItems = [];
        if (value) {
          this.desserts.forEach(order => {
            selectedItems.push(order.orderDetailNo);
          });
        }
        this.selectedItems = selectedItems;
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
  width: 85%;
  padding: 10px;
  border-radius: 10px 0 0 10px / 10px 0 0 10px;
  background-color: #f3f4f7;

  .filterContainer {
    width: 100%;
    /* height: 320px; */
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
      display: flex;
      align-items: center;
      margin: 15px;

      .filterTitle {
        width: 80px;
        margin: 0 20px;
        span {
          font-size: 14px;
        }
      }

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

      input[type="checkbox"] {
        display: none;
      }

      input[type="checkbox"] + label {
        display: inline-block;
        padding: 5px 0px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        font-size: 11px !important;
        width: 80px;
        text-align: center;
      }

      input[type="checkbox"]:checkbox + label {
        background-image: none;
        background-color: #3598dc;
        color: #fff;
      }

      input[type="checkbox"]:checked + label {
        background-color: #2b80d4;
        border-color: #2b80d4;
        color: #ffffff;
        font-weight: 700;
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

  .tableContainer {
    padding: 5px;
    border-radius: 10px;
    background-color: white;

    .tableContainerHeaderBtns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 7px;

      .totalQuantity {
        margin-right: 10px;
        font-size: 14px;
      }

      .selectItemsPerPage {
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
    }

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
