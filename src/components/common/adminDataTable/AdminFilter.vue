<template>
  <div class="filterContainer">
    <div class="filterList">
      <div class="filterTitle">
        <slot name="filterTitle1"> <span>필터 </span> </slot>
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
        v-model="$store.getters.searchInputData"
        class="searchInputBox"
        placeholder="검색어를 입력하세요"
      />
      <span>{{ $store.getters.searchInputData }}</span>
    </div>
    <div class="filterList">
      <div class="filterTitle">
        <slot name="filtertitle2">
          <span>결제완료일 : </span>
        </slot>
      </div>
      <div class="filterBtnsGroup">
        <div
          v-for="dateOptions in payedCompletedDateList"
          v-bind:key="dateOptions.id"
        >
          <slot name="filterRadioBtn1">
            <input
              type="radio"
              :id="dateOptions.id"
              :value="dateOptions.value"
              v-model="payedCompletedDate"
            />
            <label :for="dateOptions.id">{{ dateOptions.text }}</label>
          </slot>
        </div>
      </div>
      <span>{{ payedCompletedDate }}</span>
      <input type="date" v-model="getStartedDate" />
      <input type="date" v-model="currentDate" />
      <span>{{ startedDate }}</span>
    </div>
    <div class="filterList">
      <div class="filterTitle">
        <slot name="filterTitle3">
          <span>셀러속성 : </span>
        </slot>
      </div>
      <div class="filterBtnsGroup">
        <slot name="filterRadioBtn2">
          <input
            type="checkbox"
            name="sellerAttribute"
            value="전체"
            id="sellerAttributeAll"
            v-model="selectAllSellerAttribute"
          />
          <label for="sellerAttributeAll">전체</label>
        </slot>
        <div
          v-for="sellerAttributes in sellerAttributeList"
          v-bind:key="sellerAttributes.id"
        >
          <slot name="filterCheckBoxBtn">
            <input
              type="checkbox"
              :id="sellerAttributes.id"
              :value="sellerAttributes.value"
              v-model="sellerAttribute"
            />
            <label :for="sellerAttributes.id">{{
              sellerAttributes.text
            }}</label>
          </slot>
        </div>
      </div>
      <span>{{ sellerAttribute }}</span>
    </div>
    <div class="filterList">
      <div class="filterTitle">
        <slot name="filterTitle">
          <span>셀러구분 : </span>
        </slot>
      </div>
      <div class="filterBtnsGroup">
        <div v-for="sellerTypes in sellerTypeList" v-bind:key="sellerTypes.id">
          <slot name="filterRadioBtn">
            <input
              type="radio"
              :id="sellerTypes.id"
              :value="sellerTypes.value"
              v-model="sellerType"
            />
            <label :for="sellerTypes.id">{{ sellerTypes.text }}</label>
          </slot>
        </div>
      </div>
      <span>{{ sellerType }}</span>
    </div>
    <div class="filterList">
      <div class="filterTitle">
        <slot name="filterTitle">
          <span>필터 타이틀</span>
        </slot>
      </div>

      <div class="filterBtnsGroup">
        <div
          v-for="deliveryTypes in deliveryTypeList"
          v-bind:key="deliveryTypes.id"
        >
          <slot name="filterRadioBtn">
            <input
              type="radio"
              :id="deliveryTypes.id"
              :value="deliveryTypes.value"
              v-model="deliveryType"
            />
            <label :for="deliveryTypes.id">{{ deliveryTypes.text }}</label>
          </slot>
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
</template>
<script>
export default {
  name: "adminFilter",
  data() {
    return {
      filterSelectedCondition: "",
      // searchInputData: "",
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
        { text: "상품명", value: "productName", disabled: false },
      ],
      payedCompletedDateList: [
        {
          name: "payedDate",
          value: "전체",
          id: "payedDateAll",
          model: "payedCompletedDate",
        },
      ],
    };
  },
  methods: {
    filterSearch: function (event) {
      alert("검색 완료!");
    },
    filterReset: function (event) {
      (this.filterSelectedCondition = ""),
        ($store.getters.searchInputData = ""),
        (this.payedCompletedDate = "3"),
        (this.sellerAttribute = ["전체"]),
        (this.sellerType = "전체"),
        (this.deliveryType = "전체");
    },
    getToday: function () {
      let currentDate = new Date().toJSON().slice(0, 10);
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let day = today.getDate();
      this.currentDate = currentDate;
      // alert(`year: ${year}, month: ${month}, day: ${day}`);
    },
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

        return (this.startedDate = `${year}-${month}-${
          day - payedCompletedDate
        }`);
      },
    },

    selectAllSellerAttribute: {
      get: function (value) {
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
      set: function (value) {
        let sellerAttribute = [];
        if (value < this.sellerAttributeList.length) {
          this.sellerAttributeList.forEach((attribute) => {
            sellerAttribute.push(attribute.value);
          });
          this.sellerAttribute = sellerAttribute;
        } else if (value === this.sellerAttributeList.length) {
          this.sellerAttribute = [];
        }
      },
    },
  },
  mounted() {
    this.getToday();
  },
};
</script>

<style lang="scss" scoped>
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
        margin: 0 2px;
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
        margin: 0px 2px;
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
