<template>
  <div class="filterContainer">
    <div class="filterList">
      <div class="filterTitle">
        <span>검색조건 : </span>
      </div>
      <div class="filterBtnsGroup">
        <select v-model="filterSelectedCondition" class="searchCondition">
          <option value="" disabled>조건을 선택해주세요 ▼ </option>
          <option
            v-for="condition in searchCondition"
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
        <label for="3month">3개월</label>
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
</template>
<script>
export default {
  name: "adminFilter",
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
      payedCompletedDateList: [
        {
          name: "payedDate",
          value: "전체",
          id: "payedDateAll",
          model: "payedCompletedDate"
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
    }

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
  },
  mounted() {
    this.getToday();
  }
};
</script>

<style lang="scss" scoped>
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
</style>
