<template>
  <div class="prepareOrder">
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
          <select
            v-model="filterSelectedCondition"
            class="searchCondition"
            @change="handleInputData()"
          >
            <option value="" disabled>조건을 선택해주세요 ▼</option>
            <option
              v-for="condition in searchCondition"
              :disabled="condition.disabled"
              v-bind:key="condition.id"
              :value="condition.value"
            >
              {{ condition.text }}
            </option>
          </select>
        </div>
        <input
          v-model="searchInputData"
          class="searchInputBox"
          placeholder="검색어를 입력하세요"
          @change="handleInputData()"
        />
      </div>
      <div class="filterList">
        <div class="filterTitle">
          <span>결제완료일 : </span>
        </div>
        <div class="filterBtnsGroup">
          <div
            v-for="dateOptions in payedCompletedDateList"
            v-bind:key="dateOptions.id"
          >
            <input
              type="radio"
              :id="dateOptions.id"
              :value="dateOptions.value"
              v-model="payedCompletedDate"
              @change="getStartedDate()"
            />
            <label :for="dateOptions.id">{{ dateOptions.text }}</label>
          </div>
        </div>
        <input type="date" class="dateBox" v-model="startedDate" />
        <span>~</span>
        <input type="date" class="dateBox" v-model="endDate" />
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
      </div>
      <div class="searchBtnBox">
        <v-btn elevation="2" md color="primary" v-on:click="getOrderListData"
          >검색</v-btn
        >
        <v-btn elevation="2" md v-on:click="handleFilterReset">초기화</v-btn>
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
            v-on:click="handlePrepareOrder"
            >배송준비처리</v-btn
          >
          <v-btn
            elevation="1"
            x-small
            color="primary"
            v-on:click="handleCancelOrder"
            >주문취소처리</v-btn
          >
        </div>
        <div class="headerRight">
          <select
            v-model="itemsOrder"
            class="selectBox"
            @change="getOrderListData()"
          >
            <option value="recent">최신주문일순</option>
            <option value="">주문일의 역순</option>
          </select>
          <select
            v-model="itemsPerPage"
            class="selectBox"
            @change="getOrderListData()"
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
              <th v-for="column in headers" v-bind:key="column">
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
                {{ order.order_number }}
              </td>
              <td>
                {{ order.created_at_date }}
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'OrderDetail',
                    params: { orderDetailNumber: order.order_detail_number }
                  }"
                >
                  {{ order.order_detail_number }}
                </router-link>
              </td>
              <td>
                {{ order.seller_name }}
              </td>
              <td>
                {{ order.product_name }}
              </td>
              <td>
                {{ order.option_information }}
              </td>
              <td>
                {{ order.option_extra_cost }}
              </td>
              <td>
                {{ order.quantity }}
              </td>
              <td>
                {{ order.customer_name }}
              </td>
              <td>
                {{ order.customer_phone }}
              </td>
              <td>
                {{ order.total_price }}
              </td>
              <td>
                {{ order.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableContainerFooterBtns">
        <v-btn
          elevation="1"
          x-small
          color="primary"
          v-on:click="handlePrepareOrder"
          >배송준비처리</v-btn
        >
        <v-btn
          elevation="1"
          x-small
          color="primary"
          v-on:click="handleCancelOrder"
          >주문취소처리</v-btn
        >

        <v-pagination
          v-model="currentPage"
          :length="10"
          @v-on:click="getOrderListData()"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { filterSelectedCondition, searchInputData } from "vuex";
import AdminHeader from "../../../components/common/adminDataTable/AdminHeader";
import AdminFilter from "../../../components/common/adminDataTable/AdminFilter";
import axios from "axios";
import Qs from "qs";
import "url-search-params";

export default {
  name: "adminOrder",
  components: { AdminHeader, AdminFilter },
  data() {
    return {
      filterSelectedCondition: "",
      filterOrderNo: "",
      filterDetailOrderNo: "",
      filterSenderName: "",
      filterSenderPhone: "",
      filterSellerName: "",
      filterProductName: "",
      searchInputData: "",
      payedCompletedDate: "3",
      sellerType: "전체",
      deliveryType: "전체",
      startedDate: "",
      endDate: "",
      sellerAttribute: [],
      itemsOrder: "recent",
      currentPage: 1,
      paginationLength: 1,
      itemsPerPage: 30,
      totalCount: 1,
      selectedItems: [],

      searchCondition: [
        { text: "주문번호", value: "1", disabled: false },
        { text: "주문상세번호", value: "2", disabled: false },
        { text: "--------------------", value: "", disabled: true },
        { text: "주문자명", value: "3", disabled: false },
        { text: "핸드폰번호", value: "4", disabled: false },
        { text: "--------------------", value: "", disabled: true },
        { text: "셀러명", value: "5", disabled: false },
        { text: "상품명", value: "6", disabled: false }
      ],

      payedCompletedDateList: [
        {
          name: "payedDate",
          value: "",
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
          value: 1,
          id: "shoppingmall",
          text: "쇼핑몰"
        },
        {
          name: "sellerAttribute",
          value: 2,
          id: "market",
          text: "마켓"
        },
        {
          name: "sellerAttribute",
          value: 3,
          id: "roadShop",
          text: "로드샵"
        },
        {
          name: "sellerAttribute",
          value: 4,
          id: "designerBrand",
          text: "디자이너브랜드"
        },
        {
          name: "sellerAttribute",
          value: 5,
          id: "generalBrand",
          text: "재너럴브랜드"
        },
        {
          name: "sellerAttribute",
          value: 6,
          id: "nationalBrand",
          text: "내셔널브랜드"
        },
        {
          name: "sellerAttribute",
          value: 7,
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
        { text: "주문번호", value: "order_number" },
        { text: "결제일자", value: "created_at_date" },
        { text: "주문상세번호", value: "order_detail_number" },
        { text: "셀러명", value: "seller_name" },
        { text: "상품명", value: "product_name" },
        { text: "옵션정보", value: "option_information" },
        { text: "옵션추가금액", value: "option_extra_cost" },
        { text: "수량", value: "quantity" },
        { text: "주문자명", value: "customer_name" },
        { text: "핸드폰번호", value: "customer_phone" },
        { text: "결제금액", value: "total_price" },
        { text: "주문상태", value: "status" }
      ],
      desserts: [
        {
          id: 0,
          order_number: 20201218000028000,
          created_at_date: "2020-12-18 17:01:45",
          order_detail_number: "B202012180001C873",
          seller_name: "모디무드",
          product_name: "쫀쫀 심플 기모 목폴라(6color)_미우블랑",
          option_information: "아이보리/free",
          option_extra_cost: 0,
          quantity: 1,
          customer_name: "장호철",
          customer_phone: "010-8516-1399",
          total_price: 9800,
          status: "상품준비"
        }
      ]
    };
  },
  watch: {
    payedCompletedDate(value) {
      setStartedDate();
    },
    itemsOrder(value) {
      getOrderListData();
    },
    itemsPerPage(value) {
      getOrderListData();
    },
    searchInputData(value) {
      handleInputData();
    },
    currentPage(value) {
      getOrderListData();
    }
  },

  methods: {
    handleInputData: function(value) {
      let filterSelectedCondition = this.filterSelectedCondition;
      let inputData = this.searchInputData;
      if (filterSelectedCondition === "1") {
        this.filterOrderNo = inputData;
        this.filterDetailOrderNo = "";
        this.filterSenderName = "";
        this.filterSenderPhone = "";
        this.filterSellerName = "";
        this.filterProductName = "";
        return;
      } else if (filterSelectedCondition === "2") {
        this.filterOrderNo = "";
        this.filterDetailOrderNo = inputData;
        this.filterSenderName = "";
        this.filterSenderPhone = "";
        this.filterSellerName = "";
        this.filterProductName = "";
        return;
      } else if (filterSelectedCondition === "3") {
        this.filterOrderNo = "";
        this.filterDetailOrderNo = "";
        this.filterSenderName = inputData;
        this.filterSenderPhone = "";
        this.filterSellerName = "";
        this.filterProductName = "";
        return;
      } else if (filterSelectedCondition === "4") {
        this.filterOrderNo = "";
        this.filterDetailOrderNo = "";
        this.filterSenderName = "";
        this.filterSenderPhone = inputData;
        this.filterSellerName = "";
        this.filterProductName = "";
        return;
      } else if (filterSelectedCondition === "5") {
        this.filterOrderNo = "";
        this.filterDetailOrderNo = "";
        this.filterSenderName = "";
        this.filterSenderPhone = "";
        this.filterSellerName = inputData;
        this.filterProductName = "";
        return;
      } else if (filterSelectedCondition === "6") {
        this.filterOrderNo = "";
        this.filterDetailOrderNo = "";
        this.filterSenderName = "";
        this.filterSenderPhone = "";
        this.filterSellerName = "";
        this.filterProductName = inputData;
        return;
      }
    },
    handleFilterReset: function(event) {
      (this.filterSelectedCondition = ""),
        (this.searchInputData = ""),
        (this.payedCompletedDate = "3"),
        (this.sellerAttribute = []),
        (this.sellerType = "전체"),
        (this.deliveryType = "전체");
    },
    handlePrepareOrder: function(event) {
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
    handleCancelOrder: function(event) {
      if (this.selectedItems.length === 0) {
        alert("선택된 것이 아무 것도 없습니다");
      } else {
        alert(`${this.selectedItems.length}개의 주문이 취소되었습니다 !`);
      }
    },
    getToday: function() {
      let endDate = new Date().toJSON().slice(0, 10);
      this.endDate = endDate;
    },
    getStartedDate: function() {
      let payedCompletedDate = this.payedCompletedDate;
      let endDate = this.endDate;
      let newDt = new Date(endDate);
      if (payedCompletedDate === null) {
        return false;
      } else {
        newDt.setDate(newDt.getDate() - payedCompletedDate);
        return (this.startedDate = newDt.toJSON().slice(0, 10));
      }
    },
    getOrderListData: function() {
      let params = {
        status: 1,
        start_date: this.startedDate,
        end_date: this.endDate,
        page: this.currentPage,
        length: this.itemsPerPage,
        attributes: this.sellerAttribute,
        order_by: this.itemsOrder,
        number: this.filterOrderNo,
        detail_number: this.filterDetailOrderNo,
        sender_name: this.filterSenderName,
        sender_phone: this.filterSenderPhone,
        seller_name: this.filterSellerName,
        product_name: this.filterProductName
      };

      axios.get("http://192.168.40.107:5000/admin/orders", { params });
      let myAxios = axios.create({
        paramsSerializer: params =>
          Qs.stringify(params, { arrayFormat: "repeat" })
      });
      myAxios
        .get("http://192.168.40.107:5000/admin/orders", { params })
        .then(res => {
          this.totalCount = res.data.totalCount;
          this.desserts = res.data.results;
        })
        .catch(function(error) {
          console.log(error);
        });
      getPaginationLength();
    }
  },
  computed: {
    getPaginationLength: function() {
      let currentPage = this.currentPage;
      let totalCount = this.totalCount;
      let itemPerPage = this.itemsPerPage;
      let paginationLength = parseInt(1 + totalCount / itemPerPage);
      return (this.paginationLength = paginationLength);
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
    this.getStartedDate();
    this.getPaginationLength();
  }
};
</script>

<style lang="scss" scoped>
.prepareOrder {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: 10px 0 0 10px / 10px 0 0 10px;
  background-color: #f3f4f7;

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
        margin-right: 5px;
        font-size: 12px;
        text-align: center;
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
