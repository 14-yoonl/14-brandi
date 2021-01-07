<template>
  <div>
    <div class="ProductManageList">
      <div class="filters">
        <div class="rowAll">
          <span>조회기간</span>
          <div class="inputText">
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
          </div>
          <div class="inputText">
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
              <div></div>
              <v-date-picker
                no-title
                locale="ko-KR"
                v-model="filters.lookupEndDate"
              ></v-date-picker>
            </v-menu>
          </div>
        </div>
        <div class="rowAll">
          <span>상품정보</span>
          <div class="selectText">
            <v-select 
              :items="searchInfoList" 
              item-text="name" 
              item-value="key" 
              label="Select" 
              v-model="setSearchState" 
              dense solo>
            </v-select>
          </div>
          <div class="inputInfo">
            <v-text-field
              v-model="setSearchData"
              color="blue darken-2"
              required
            ></v-text-field>
          </div>
            
          </v-select>
          <span>셀러명</span>
          <div class="inputText">
            <v-text-field
              v-model="filters.sellerName"
              color="blue darken-2"
              required
            ></v-text-field>
          </div>
        </div>
        <div class="rowAll">
          <span>셀러속성 : </span>
          <div>
            <v-btn-toggle v-model="setSellerAttributeType" multiple dense group>
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
            <v-btn-toggle v-model="filters.isSale" dense group>
              <v-btn :value="0">
                전체
              </v-btn>
              <v-btn :value="1">
                판매
              </v-btn>
              <v-btn :value="2">
                미판매
              </v-btn>
            </v-btn-toggle>
          </div>
          <span>진열여부 : </span>
          <div>
            <v-btn-toggle v-model="filters.isDisplay"dense group>
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
            <v-btn-toggle v-model="filters.isDiscount" dense group>
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
      </div>
      <div class="actionBtn">
        <v-btn depressed color="primary" @click="searchBtn">
          검색
        </v-btn>
        <v-btn depressed outlined @click="searchReset">
          초기화
        </v-btn>
      </div>
    </div>
    <div class="ProductManageList">
      <div class="filterListTable">
        <div class="tableTool">
          <span class="totalQuantity"
            >전체 조회건 수 : {{ setData.total_count }} 건</span
          >
          <div class="perPage">
            <v-select 
              v-model="listPerpage" 
              :items="perPageList" 
              item-text="value"
              item-value="key"
              label="Select"
              dense solo>
            </v-select>
          </div>
        </div>
        <div class="tableBody">
          <table>
            <thead>
              <tr>
                <th v-for="product in listColumn">
                  <span v-if="product.value === '상품체크'">
                    <v-checkbox
                      color="success"
                      hide-details
                      v-model="selectAll"
                    ></v-checkbox>
                  </span>
                  <span v-else>
                    {{ product.value }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in setData.product_list" v-bind:key="index">
                <td v-for="column in listColumn">
                  <span v-if="column.value === '상품체크'">
                    <input type="checkbox" :value="product.product_id" v-model="selectProduct"/>
                  </span>
                  <span v-else-if="column.value === '등록상태'">등록완료</span>
                  <span v-else-if="column.value === '대표이미지'"><img :src="product[column.key]"/></span>
                  <span v-else-if="column.value === '상품코드'">
                    <span class="toDetailBtn" @click="ChagePage(product[column.key] )">{{product[column.key]}}</span>
                    <!-- <router-link :to="{ name: 'ProductDetail', params: { productKey: product[column.key] } }">
                     -->
                    </router-link>
                  </span>
                  <span v-else-if="column.value === '판매여부'">{{ product[column.key] === 1 ?"판매":"미판매" }}</span>
                  <span v-else-if="column.value === '진열여부'">{{ product[column.key] === 1 ?"진열":"미진열" }}</span>
                  <span v-else-if="column.value === '할인여부'">{{ product[column.key] === 1 ?"할인":"미할인" }}</span>
                  <span v-else>
                    {{ product[column.key] }}
                  </span>
                </td>
              </tr>
              <tr v-if="!setData.product_list.length">
                <td colspan="15">데이터가 없습니다</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="text-center">
        <v-pagination
          v-model="pageNow"
          :value="pageNow"
          :total-visible="9"
          :length="Math.ceil(setData.total_count / listPerpage)"
        ></v-pagination>
      </div>
    </div>
      <LodingSpinner v-if="$store.getters.getLodingSpinner" />
  </div>
</template>
<script>
import LodingSpinner from "../../../components/common/LodingSpinner";
import mixin from "../../../components/mixins/util";

export default {
  name: "ProductManageList",
  components: { LodingSpinner},
  mixins: [mixin],
  created() {
    this.getFilterList();
  },
  data() {
    return {
      pageNow: 1,
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
        { key: "product_check", value: "상품체크" },
        { key: "updated_state", value: "등록상태" },
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
      ],
      perPageList:[
        { key: 10, value: "10개씩 보기" },
        { key: 20, value: "20개씩 보기" },
        { key: 50, value: "50개씩 보기" }
      ]
    };
  },

  methods: {
    getFilterList(value) {      
      this.$store.dispatch("searchFilterList", this.$route.query);
    },
    ChagePage(key){
      this.$router.push({ name: 'ProductDetail', params: { productKey: key } });
      // <!-- <router-link :to="{ name: 'ProductDetail', params: { productKey: product[column.key] } }">
    },
    
    searchBtn() {
      this.pageNow = 1
      this.listPerpage = 10
      
      const searchItem = {
        is_sale: this.filters.isSale,
        is_discount: this.filters.isDiscount,
        is_display: this.filters.isDisplay,
        seller_attribute_type_id: this.filters.sellerAttributeType,
        limit: this.listPerpage,
        page_number: this.pageNow,
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
      const { search_condition } = this.$store.getters.getFilterList;

      search_condition && Object.keys(search_condition).forEach(list=>{
        // console.log(search_condition[list],"+++++",list)

        //0을 값을 기준으로 변경이 되기 때
        console.log(search_condition[list])
        if(search_condition[list]){
          console.log(search_condition[list],"------------------------",list)
          if(list === 'limit') this.listPerpage = search_condition[list]
          else if(list === 'page_number'){
            this.pageNow = search_condition[list]
          }else{this.filters[this.snakeToCamel(list)] = search_condition[list]}
        } 
          
      })

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
          if(value.length === 7){
            this.filters.sellerAttributeType = [0];
            return;
          }
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
        const {productId, productCode, productName}  = this.filters;
        if(productId) return productId
        else if(productCode)return productCode
        else if(productName)return productName

      },
      set : function(value){
        this.filters[this.searchState] = value
      }
    },
    setSearchState:{
      get:function(){
        const {productId, productCode, productName}  = this.filters;

        if(productId) return 'productId'
        else if(productCode)return 'productCode'
        else if(productName)return 'productName'

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
    pageNow(value) {
      const route = this.$route.query;

      this.selectProduct=[];
      
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
.ProductManageList{
  margin: 10px auto;
  padding: 10px;
  background-color: white;
  border-radius: 10px;

  .filters {
    .rowAll {
      display: flex;
      align-items: center;

      span {
        width: 100px;
        text-align: center;
      }
    }

    >>> .v-input {
      margin: 0 10px;
    }

    

    .inputText{
      width:  225px;

      >>> label {
        font-size : 13px;  
      }
    }
    .selectText{
      width: 150px;
      
      >>> label {
        font-size : 13px;  
      }
    }

    .inputInfo{
      width: 300px;
    }
  }

  .filterListTable{
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px 0;
    background-color: #fafafa;

    .tableHeader {
      display: flex;
      justify-content: space-between;
      padding: 6px 8px;
      color: #333;
      background-color: #eeeeee;
    }

    .tableTool {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: auto;
      padding: 10px;
      font-size: 15px;

      .selectItemsPerPage{
        font-size: 14px;
        color: #333333;
        background-color: white;
        border: 1px solid #e5e5e5;
      }

      .perPage{
        width: 150px;
      }

      >>> .v-text-field__details{
        display: none;
      }
    }

    img{
      width : 130px;
      height: 130px;
      object-fit: cover;
      margin: 10px;
    }

    .tableBody {
      background-color: #f9f9f9;
      width: auto;
      overflow-x: scroll;

      table {
        table-layout: fixed;
        margin: 0 15px;
        text-align: center;
        font-size: 13px;
        border-collapse: collapse;
        border: 1px solid #ddd;

        thead {
          tr {
            background-color: #eee;
            th {
                width: 200px;

              >>> .v-input--selection-controls {
                margin: 0;
                padding: 0;

                .v-input--selection-controls__input {
                  margin: 0 auto;
                }
              }
            }
          }
        }

        tbody {
          tr {
            td {
              border: 1px solid #ddd;
              /* width: 200px; */

              >>> .v-input--selection-controls {
                margin: 0;
                padding: 0;

                .v-input--selection-controls__input {
                  margin: 0 auto;
                }
              }

              .toDetailBtn{
                color : #0d638f;
                cursor: pointer;
              }
            }
            &:hover {
              background-color: #f5f5f5;
            }

            &:nth-child(odd) {
              background-color: #ffffff;
            }
          }
        }
      }
    }
  }

  .actionBtn{
    text-align: center;

    >>> .v-btn--depressed  {
      width : 150px;
    }
  }
}

 .v-text-field__details{
  display: none;
}

>>>.v-menu__content {
    min-width: auto !important;
    background-color:red !important;
  }
</style>