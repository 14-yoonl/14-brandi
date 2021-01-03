<template>
  <div class="ProductManageList">
    <DataListTable>
      <tamplet slot="tableRow">
        <div class="rowAll">
          <span>조회기간</span>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="filters.lookupStartDate"
                :label="
                  !filters.lookupStartDate ? `시작 날짜를 선택해주세요` : ``
                "
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              locale="ko-KR"
              v-model="filters.lookupStartDate"
            ></v-date-picker>
          </v-menu>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="filters.lookupEndDate"
                :label="
                  !filters.lookupEndDate ? `마지막 날짜를 선택해주세요` : ``
                "
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              locale="ko-KR"
              v-model="filters.lookupEndDate"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="rowAll">
          <span>셀러명</span>
          <v-text-field
            v-model="filters.sellerName"
            color="blue darken-2"
            required
          ></v-text-field>
          <span>상품정보</span>
          <v-select :items="searchInfoList" item-text="name" item-value="key" label="Select" v-model="setSearchState" dense solo></v-select>
           <v-text-field
            v-model="setSearchData"
            color="blue darken-2"
            required
          ></v-text-field>
          </v-select>
        </div>
        <div class="rowAll">
          <span>셀러속성 : </span>
          <div>
            <v-btn-toggle v-model="setSellerAttributeType" tile multiple>
              <v-btn :value="0">
                전체
              </v-btn>
              <v-btn :value="1">
                쇼핑몰
              </v-btn>
              <v-btn :value="2">
                마켓
              </v-btn>
              <v-btn :value="3">
                로드샵
              </v-btn>
              <v-btn :value="4">
                디자이너브랜드
              </v-btn>
              <v-btn :value="5">
                제너럴브랜드
              </v-btn>
              <v-btn :value="6">
                내셔널브랜드
              </v-btn>
              <v-btn :value="7">
                뷰티
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
        <div class="rowAll">
          <span>판매여부 : </span>
          <div>
            <v-btn-toggle v-model="filters.isSale" tile mandatory>
              <v-btn :value="0">
                전체
              </v-btn>
              <v-btn :value="1">
                판매
              </v-btn>
              <v-btn :value="2">
                마켓
              </v-btn>
            </v-btn-toggle>
          </div>
          <span>진열여부 : </span>
          <div>
            <v-btn-toggle v-model="filters.isDisplay" tile mandatory>
              <v-btn :value="0">
                전체
              </v-btn>
              <v-btn :value="1">
                진열
              </v-btn>
              <v-btn :value="2">
                미진열
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
        <div class="rowAll">
          <span>할인여부 : </span>
          <div>
            <v-btn-toggle v-model="filters.isDiscount" tile mandatory>
              <v-btn :value="0">
                전체
              </v-btn>
              <v-btn :value="1">
                할인
              </v-btn>
              <v-btn :value="2">
                미할인
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </tamplet>
    </DataListTable>
    <v-btn depressed color="primary" @click="searchBtn">
      검색
    </v-btn>
    <v-btn depressed color="primary" @click="searchReset">
      초기화
    </v-btn>
    <DataListTable>
      <template slot="tableSetOption">
        <div class="tableTool">
          <span class="totalQuantity"
            >전체 조회건 수 : {{ setData.total_count }} 건</span
          >
          <select v-model="listPerpage" class="selectItemsPerPage">
            <option value="10">10개씩 보기</option>
            <option value="20">20개씩 보기</option>
            <option value="50">50개씩 보기</option>
          </select>
        </div>
      </template>
      <template v-slot:header>
        <th>
          <v-checkbox
            color="success"
            hide-details
            v-model="selectAll"
          ></v-checkbox>
        </th>
        <th>등록상태</th>
        <th v-for="product in listColumn">
          {{ product.value }}
        </th>
      </template>
      <template v-slot:content>
        <tr v-for="(product, index) in setData.product_list" v-bind:key="index">
          <td>
            <v-checkbox
              color="success"
              :value="product.product_id"
              v-model="selectProduct"
              hide-details
            ></v-checkbox>
          </td>
          <td>
            등록완료
          </td>
          <td v-for="column in listColumn">
            <img
              :src="product[column.key]"
              v-if="column.value === '대표이미지'"
            />
            <span v-else>
              {{ product[column.key] }}
            </span>
          </td>
        </tr>
      </template>
    </DataListTable>
    <div class="text-center">
      <v-pagination
        v-model="PageNow"
        :total-visible="9"
        :length="Math.ceil(setData.total_count / listPerpage)"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import DataListTable from "../../../components/common/DataListTable";

export default {
  name: "ProductManageList",
  components: { DataListTable },
  created() {
    this.searchBtn();
  },
  data() {
    return {
      PageNow: 1,
      listPerpage: 10,
      filterList: [],
      selectProduct: [],
      searchState : "",
      searchInfoList : [{name:'상품명',key:"productName"},{name:'상품번호',key:"productId"},{name:'상품코드',key:"productCode"}],
      filters: {
        isSale: 0,
        isDisplay: 0,
        isDiscount: 0,
        sellerAttributeType: [0],
        lookupStartDate: "",
        lookupEndDate: "",
        sellerName: "",
        productName: "",
        productCode: "",
        productId:""
      },

      listColumn: [
        { key: "updated_at", value: "등록일" },
        { key: "product_image_url", value: "대표이미지" },
        { key: "product_name", value: "상품명" },
        { key: "product_code", value: "상품코드" },
        { key: "product_id", value: "상품번호" },
        { key: "seller_attribute_type", value: "셀러속성" },
        { key: "seller_name", value: "셀러명" },
        { key: "origin_price", value: "판매가" },
        { key: "discounted_price", value: "할인가" },
        { key: "is_sale", value: "판매여부" },
        { key: "is_display", value: "진열여부" },
        { key: "discount_rate", value: "할인여부" }
      ]
    };
  },
  methods: {
    getFilterList(value) {
      this.$store.dispatch("searchFilterList", this.$route.query);
    },
    
    searchBtn() {
      this.filters.PageNow = 1

      const searchItem = {
        is_sale: this.filters.isSale,
        is_discount: this.filters.isDiscount,
        is_display: this.filters.isDisplay,
        seller_attribute_type_id: this.filters.sellerAttributeType,
        limit: this.listPerpage,
        page_number: this.filters.PageNow,
        lookup_start_date: this.filters.lookupStartDate,
        lookup_end_date: this.filters.lookupEndDate,
        product_id:this.filters.productId,
        seller_name : this.filters.sellerName,
        product_name:this.filters.productName,
        product_id:this.filters.productId,
        product_code:this.filters.productCode
      };


      const query = Object.keys(searchItem).reduce((accValue, value) => {
        if (typeof searchItem[value] === "object") {
          if (searchItem[value][0]) accValue[value] = `[${searchItem[value]}]`;
        } else {
          if (searchItem[value]) accValue[value] = searchItem[value];
        }
        return accValue;
      }, {});

      this.$router.push({
        name: "ProductManageList",
        query
      });
      this.getFilterList();
    },
    searchReset() {
      this.filters.isSale = 0;
      this.filters.isDisplay = 0;
      this.filters.isDiscount = 0
      this.filters.sellerAttributeType = [0];
      this.filters.lookupStartDate = "";
      this.filters.lookupEndDate = "";
      this.filters.sellerName = "";
      this.filters.productId = "";
      this.filters.productName = "";
      this.filters.productCode = "";
    }
  },
  computed: {
    setData() {
      return this.$store.getters.getFilterList;
    },
    setSellerAttributeType: {
      get: function() {
        return this.filters.sellerAttributeType;
      },
      set: function(value) {
        const inputData = value[value.length - 1];

        if (inputData === 0 || inputData === undefined) {
          this.filters.sellerAttributeType = [0];
        } else {
          const result = value.filter(list => list != 0);
          this.filters.sellerAttributeType = result;
        }
      }
    },
    selectAll: {
      get: function() {
        return this.listPerpage === this.selectProduct.length;
      },
      set: function(value) {
        let selectedItems = [];
        if (value) {
          this.setData.product_list.forEach(list => {
            selectedItems.push(list.product_id);
          });
        }
        this.selectProduct = selectedItems;
      }
    },
    setSearchData:{
      get:function(){
        return this.filters[this.searchState]
      },
      set : function(value){
        this.filters[this.searchState] = value
      }
    },
    setSearchState:{
      get:function(){
        return this.searchState
      },set:function(value){
        if(value){
          this.searchState = value
        }
        this.filters.productId = "",
        this.filters.productCode = "",
        this.filters.productName = ""
      }
    }
  },
  watch: {
    listPerpage(value) {
      const route = this.$route.query;
      this.$router.push({
        name: "ProductManageList",
        query: { ...route, limit: value }
      });
      this.getFilterList();
    },
    PageNow(value) {
      const route = this.$route.query;
      this.$router.push({
        name: "ProductManageList",
        query: { ...route, page_number: value }
      });
      this.getFilterList();
    },
  }
};
</script>

<style lang="scss" scoped>
.tableTool {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.v-menu__content {
  min-width: auto !important;
}

>>> .v-text-field__details{
  display: none;
}
</style>
