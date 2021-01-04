<template>
  <div class="AdminOrder">
    <div class="headerContainer">
      <div class="title">
        <h1 class="mainTitle">주문관리</h1>
        <span class="subTitle">배송중 관리</span>
      </div>
    </div>
    <div class="filterContainer">
      <div class="filterList">
        <div class="filterTitle">
          <span>검색조건 : </span>
        </div>
        <div class="filterBtnsGroup">
          <select v-model="filterSelectedCondition" class="searchCondition">
            <option value="" disabled>조건을 선택해주세요 ▼</option>
            <option
              v-for="condition in searchCondition"
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
          <span>배송시작일 : </span>
        </div>
        <div class="filterBtnsGroup">
          <div
            v-for="dateOptions in deliveryStartedDateList"
            v-bind:key="dateOptions.id"
          >
            <input
              type="radio"
              :id="dateOptions.id"
              :value="dateOptions.value"
              v-model="deliveryStartedDate"
              @change="getStartedDate()"
            />
            <label :for="dateOptions.id">{{ dateOptions.text }}</label>
          </div>
        </div>
        <span>{{ deliveryStartedDate }}</span>
        <input type="date" class="dateBox" v-model="startedDate" />
        <input type="date" class="dateBox" v-model="currentDate" />
        <span>{{ startedDate }}</span>
        <span>{{ currentDate }}</span>
      </div>
      <div class="filterList">
        <div class="filterTitle">
          <span>운송장번호 : </span>
        </div>
        <input
          v-model="waybillInputData"
          class="searchInputBox"
          placeholder="운송장번호를 입력하세요(특수문자, 띄어쓰기 제외)"
        />
        <span>{{ waybillInputData }}</span>
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
            v-model="selectAllSellerAttribute"
          />
          <label for="sellerAttributeAll">전체</label>
          <div
            v-for="sellerAttributes in sellerAttributeList"
            v-bind:key="sellerAttributes.id"
          >
            <input
              type="checkbox"
              :id="sellerAttributes.id"
              :value="sellerAttributes.value"
              v-model="sellerAttribute"
            />
            <label :for="sellerAttributes.id">{{
              sellerAttributes.text
            }}</label>
          </div>
        </div>
        <span>{{ sellerAttribute }}</span>
      </div>
      <div class="filterList">
        <div class="filterTitle">
          <span>셀러구분 : </span>
        </div>
        <div class="filterBtnsGroup">
          <div
            v-for="sellerTypes in sellerTypeList"
            v-bind:key="sellerTypes.id"
          >
            <input
              type="radio"
              :id="sellerTypes.id"
              :value="sellerTypes.value"
              v-model="sellerType"
            />
            <label :for="sellerTypes.id">{{ sellerTypes.text }}</label>
          </div>
        </div>
        <span>{{ sellerType }}</span>
      </div>
      <div class="filterList">
        <div class="filterTitle">
          <span>배송구분 : </span>
        </div>
        <div class="filterBtnsGroup">
          <div
            v-for="deliveryTypes in deliveryTypeList"
            v-bind:key="deliveryTypes.id"
          >
            <input
              type="radio"
              :id="deliveryTypes.id"
              :value="deliveryTypes.value"
              v-model="deliveryType"
            />
            <label :for="deliveryTypes.id">{{ deliveryTypes.text }}</label>
          </div>
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
            >전체 조회건 수 : {{ totalCount }} 건</span
          >
          <v-btn
            elevation="1"
            x-small
            color="primary"
            v-on:click="finishDelivery"
            >배송완료처리</v-btn
          >
        </div>
        <div class="headerRight">
          <span>{{ itemsOrder }}</span>
          <select
            v-model="itemsOrder"
            class="selectBox"
            @change="handleItemsOrder"
          >
            <option value="desc">최신주문일순</option>
            <option value="asc">주문일의 역순</option>
          </select>

          <span>{{ itemsPerPage }}</span>
          <select
            v-model="itemsPerPage"
            class="selectBox"
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
              <th
                v-for="column in headers"
                v-bind:key="column"
                disable="{column.isMaster}"
              >
                {{ column.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in desserts" v-bind:key="order">
              <td>
                <v-checkbox
                  color="success"
                  :value="order.id"
                  v-model="selectedItems"
                  hide-details
                ></v-checkbox>
              </td>
              <td>
                {{ order.paidDate }}
              </td>
              <td>
                {{ order.deliveryStartedDate }}
              </td>
              <td>
                {{ order.orderNo }}
              </td>
              <td>
                {{ order.orderDetailNo }}
              </td>
              <td>
                {{ order.sellerName }}
              </td>
              <td>
                {{ order.productName }}
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
                {{ order.orderStatus }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableContainerFooterBtns">
        <v-btn elevation="1" x-small color="primary" v-on:click="finishDelivery"
          >배송완료처리</v-btn
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
import axios from "axios";
export default {
  name: "inDelivery",
  data() {
    return {
      filterSelectedCondition: "",
      searchInputData: "",
      deliveryStartedDate: "3",
      waybillInputData: "",
      sellerAttribute: [],
      sellerType: "전체",
      deliveryType: "전체",
      selectedItems: [],
      startedDate: "",
      currentDate: "",
      currentPage: 1,
      itemsOrder: "desc",
      itemsPerPage: 30,
      totalCount: 5,
      searchCondition: [
        { text: "주문번호", value: "orderNo", disabled: false },
        { text: "주문상세번호", value: "orderDetailNo", disabled: false },
        { text: "--------------------", value: "", disabled: true },
        { text: "주문자명", value: "senderName", disabled: false },
        { text: "핸드폰번호", value: "senderPhone", disabled: false },
        { text: "--------------------", value: "", disabled: true },
        { text: "셀러명", value: "sellerName", disabled: false },
        { text: "상품명", value: "productName", disabled: false }
      ],

      deliveryStartedDateList: [
        {
          name: "payedDate",
          value: "전체",
          id: "payedDateAll",
          text: "전체"
        },
        {
          name: "payedDate",
          value: "0",
          id: "today",
          text: "오늘"
        },
        {
          name: "payedDate",
          value: "3",
          id: "3days",
          text: "3일"
        },
        {
          name: "payedDate",
          value: "7",
          id: "7days",
          text: "1주일"
        },
        {
          name: "payedDate",
          value: "30",
          id: "30days",
          text: "1개월"
        },
        {
          name: "payedDate",
          value: "90",
          id: "3month",
          text: "3개월"
        }
      ],

      sellerAttributeList: [
        {
          name: "sellerAttribute",
          value: "쇼핑몰",
          id: "shoppingmall",
          text: "쇼핑몰"
        },
        {
          name: "sellerAttribute",
          value: "마켓",
          id: "market",
          text: "마켓"
        },
        {
          name: "sellerAttribute",
          value: "로드샵",
          id: "roadShop",
          text: "로드샵"
        },
        {
          name: "sellerAttribute",
          value: "디자이너브랜드",
          id: "designerBrand",
          text: "디자이너브랜드"
        },
        {
          name: "sellerAttribute",
          value: "뷰티",
          id: "beauty",
          text: "뷰티"
        }
      ],

      sellerTypeList: [
        {
          name: "sellerType",
          value: "전체",
          id: "sellerTypeAll",
          text: "전체"
        },
        {
          name: "sellerType",
          value: "일반",
          id: "normalSeller",
          text: "일반"
        },
        {
          name: "sellerType",
          value: "헬피",
          id: "helpySeller",
          text: "헬피"
        }
      ],

      deliveryTypeList: [
        {
          name: "deliveryType",
          value: "전체",
          id: "deliveryTypeAll",
          text: "전체"
        },
        {
          name: "deliveryType",
          value: "일반배송",
          id: "normalDelivery",
          text: "일반배송"
        },
        {
          name: "deliveryType",
          value: "오늘출발",
          id: "sendToday",
          text: "오늘출발"
        },
        {
          name: "deliveryType",
          value: "새벽도착",
          id: "arriveDawn",
          text: "새벽도착"
        },
        {
          name: "deliveryType",
          value: "저녁도착",
          id: "arriveEvening",
          text: "저녁도착"
        }
      ],

      headers: [
        { text: "결제일자", value: "paidDate" },
        { text: "배송시작일", value: "deliveryStartedDate" },
        { text: "주문번호", value: "orderNo" },
        { text: "주문상세번호", value: "orderDetailNo" },
        { text: "셀러명", value: "sellerName" },
        { text: "상품명", value: "productName" },
        { text: "주문자명", value: "senderName", isMaster: false },
        { text: "핸드폰번호", value: "senderPhone", isMaster: true },
        { text: "결제금액", value: "paidPrice" },
        { text: "주문상태", value: "orderStatus" }
      ],
      desserts: [
        {
          id: 0,
          orderNo: 20201218000028012,
          paidDate: "2020-12-18 17:01:45",
          deliveryStartedDate: "2020-12-18 17:01:45",
          orderDetailNo: "B202012180001C100",
          sellerName: "모디무드",
          productName: "쫀쫀 심플 기모 목폴라(6color)_미우블랑",
          options: "아이보리/free",
          optionsPrice: 0,
          quantity: 1,
          senderName: "장호철",
          senderPhone: "010-8516-1399",
          paidPrice: 100000,
          orderStatus: "상품준비"
        }
      ]
    };
  },
  methods: {
    filterSearch: function(event) {
      getOrderListData();
      alert("검색 완료!");
    },
    filterReset: function(event) {
      (this.filterSelectedCondition = ""),
        (this.searchInputData = ""),
        (this.deliveryStartedDate = "3"),
        (this.sellerAttribute = []),
        (this.sellerType = "전체"),
        (this.deliveryType = "전체");
    },
    finishDelivery: function(event) {
      if (this.selectedItems.length === 0) {
        alert("선택된 것이 아무 것도 없습니다");
      } else {
        for (let i = 0; i < this.selectedItems.length; i++) {
          axios.patch(
            `http://192.168.40.107:5000/admin/orders?id=${this.selectedItems[i]}&status_id=1`
          );
        }
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
      this.currentDate = currentDate;
    },
    setStartedDate: function() {
      let deliveryStartedDate = this.deliveryStartedDate;
      let currentDate = this.currentDate;
      let newDt = new Date(currentDate);
      newDt.setDate(newDt.getDate() - deliveryStartedDate);
      return (this.startedDate = newDt.toJSON().slice(0, 10));
    },
    getOrderListData: function() {
      axios
        .get(
          `http://192.168.40.107:5000/admin/orders?status=2&start_date=${this.startedDate}&end_date=${this.endDate}&page=${this.currentPage}&length=${this.itemsPerPage}`
        )
        .then(res => {
          this.totalCount = res.data.totalCount;
          this.desserts = res.data.results;
        });
    }
  },
  computed: {
    getStartedDate: function() {
      let startedDate = this.startedDate;
      let deliveryStartedDate = this.deliveryStartedDate;
      let currentDate = this.currentDate;
      let newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - deliveryStartedDate);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let day = newDate.getDate();
      let fullDay = [year, month, day].join("-");
      return console.log(fullDay);
      this.startedDate = fullDay;
    },

    selectAllSellerAttribute: {
      get: function(value) {
        if (this.sellerAttribute.length === 0) {
          return true;
        } else if (
          this.sellerAttribute.length < this.sellerAttributeList.length
        ) {
          return false;
        } else {
          return true;
        }
      },
      set: function(value) {
        let sellerAttribute = [];
        if (value < this.sellerAttributeList.length) {
          this.sellerAttributeList.forEach(attribute => {
            sellerAttribute.push(attribute.value);
          });
          this.sellerAttribute = sellerAttribute;
        } else if (value === this.sellerAttributeList.length) {
          this.sellerAttribute = [];
        }
      }
    },

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
            selectedItems.push(order.id);
          });
        }
        this.selectedItems = selectedItems;
      }
    }
  },
  mounted() {
    this.getToday();
    this.setStartedDate();
    this.getOrderListData();
  }
};
</script>

<style lang="scss" scoped>
.AdminOrder {
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 10px;
  border-radius: 10px 0 0 10px / 10px 0 0 10px;
  background-color: #f3f4f7;

  .headerContainer {
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
  }

  .filterContainer {
    width: 100%;
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

      .filterBtnsGroup {
        display: flex;

        :hover {
          cursor: pointer;
        }

        input[type="radio"] {
          display: none;
        }

        input[type="radio"] + label {
          display: inline-block;
          width: 80px;
          margin: 0 2px;
          padding: 5px 0px;
          background-color: #f5f5f5;
          border: 1px solid #ccc;
          font-size: 11px !important;
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
          width: 80px;
          margin: 0px 2px;
          padding: 5px 0px;
          background-color: #f5f5f5;
          border: 1px solid #ccc;
          font-size: 11px !important;
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
      [type="date"] {
        background: #fff
          url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)
          97% 50% no-repeat;
      }
      [type="date"]::-webkit-inner-spin-button {
        display: none;
      }
      [type="date"]::-webkit-calendar-picker-indicator {
        opacity: 0;
      }

      input[type="date"] {
        width: 50px;
        height: 28px;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        background-color: #fff;
        padding: 3px 5px;
        margin: 0 5px;
        width: 190px;
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

      .selectBox {
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
