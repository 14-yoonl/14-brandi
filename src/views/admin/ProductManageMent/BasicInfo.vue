<template>
  <div class="BasicInfo">
    <DataTable>
      <template v-slot:header>기본 정보</template>
      <template v-slot:body>
        <tr>
          <td>
            셀러 선택
            <v-icon x-small color="red">
              mdi-star
            </v-icon>
          </td>
          <td>
            <span v-if="$route.params.productKey">{{ sellerName }}</span>
            <v-autocomplete
              v-if="!$route.params.productKey"
              @input="setData('sellerId', $event)"
              :loading="isLoading"
              :items="$store.getters.getSearchList"
              :search-input.sync="searchSeller"
              :label="sellerId ? `` : `셀러를 선택하세요`"
              item-text="seller_id"
              item-value="account_name"
              chips
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                >
                  {{ data.item.seller_name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content @click="selectSeller">
                    <v-list-item-title
                      v-html="data.item.seller_name"
                    ></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </td>
        </tr>
        <tr>
          <td>판매여부</td>
          <td>
            <v-radio-group
              @change="setData(`isSale`, $event)"
              :value="isSale"
              row
            >
              <v-radio :label="`판매`" :value="1"></v-radio>
              <v-radio :label="`미판매`" :value="0"></v-radio>
            </v-radio-group>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon>미판매 선택시 앱에서 Sold Out으로
              표시됩니다.
            </div>
          </td>
        </tr>
        <tr>
          <td>진열여부</td>
          <td>
            <v-radio-group
              @change="setData(`isDisplay`, $event)"
              :value="isDisplay"
              row
            >
              <v-radio :label="`진열`" :value="1"></v-radio>
              <v-radio :label="`미진열`" :value="0"></v-radio>
            </v-radio-group>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon>미진열 선택시 앱에서 노출되지
              않습니다.
            </div>
          </td>
        </tr>
        <tr>
          <td>
            카테고리
            <v-icon x-small color="red">
              mdi-star
            </v-icon>
          </td>
          <td>
            <table class="categoryTable">
              <thead>
                <tr>
                  <th>1차 카테고리</th>
                  <th>2차 카테고리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <v-select
                      @input="setCategoryMain('mainCategory', $event)"
                      :value="mainCategory"
                      :items="setCategory('main')"
                      item-text="main_category_name"
                      item-value="main_category_id"
                      :label="!mainCategory && '1차 카테고리를 선택해주세요.'"
                    >
                      <template v-slot:selection="{ item }">
                        <span
                          class="d-flex justify-center"
                          style="width: 100%;"
                        >
                          {{ item.main_category_name }}
                        </span>
                      </template>
                    </v-select>
                  </td>
                  <td>
                    <v-select
                      @input="setData('subCategory', $event)"
                      :value="subCategory"
                      :items="setCategory('sub')"
                      item-text="sub_category_name"
                      item-value="sub_category_id"
                      :label="
                        mainCategory
                          ? !subCategory && '2차 카테고리를 선택해주세요.'
                          : '1차 카테고리를 먼저 선택해주세요.'
                      "
                    >
                      <template v-slot:selection="{ item }">
                        <span
                          class="d-flex justify-center"
                          style="width: 100%;"
                        >
                          {{ item.sub_category_name }}
                        </span>
                      </template></v-select
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>상품 정보 고시</td>
          <td>
            <v-radio-group
              @change="setData(`isProductNotice`, $event)"
              :value="isProductNotice"
              row
            >
              <v-radio :label="`상품상세 참조`" :value="0"></v-radio>
              <v-radio :label="`직접입력`" :value="1"></v-radio>
            </v-radio-group>
            <div class="productNotice" v-if="isProductNotice">
              <div>
                <span>제조사(수입사) : </span>
                <v-text-field
                  :value="manufacturer"
                  @input="setData(`manufacturer`, $event)"
                  placeholder="한줄 상품 설명을 입력해주세요."
                ></v-text-field>
              </div>
              <div>
                <span>제조일자 :</span>
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="manufacturingDate"
                      :label="
                        !manufacturingDate ? `제조일자를 선택해주세요` : ``
                      "
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    locale="ko-KR"
                    v-model="txtdate"
                    @input="setData('manufacturingDate', $event)"
                  ></v-date-picker>
                </v-menu>
              </div>
              <div>
                <span>원산지 : </span>
                <v-select
                  :items="getOptions"
                  :value="productOriginTypeId"
                  item-text="product_origin_type_name"
                  item-value="product_origin_type_id"
                  @change="setData('productOriginTypeId', $event)"
                  :label="!productOriginTypeId && '원산지를 입력해주세요.'"
                ></v-select>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            상품명
            <v-icon x-small color="red">
              mdi-star
            </v-icon>
          </td>
          <td>
            <v-text-field
              :value="productName"
              @input="setData('productName', $event)"
              placeholder="상품명을 입력해주세요."
            ></v-text-field>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon>상품명에는 쌍따옴표(") 또는
              홑따옴표(')를 포함할 수 없습니다.
            </div>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon>상품명에는 4byte 이모지를 포함할
              수 없습니다.
            </div>
          </td>
        </tr>
        <tr>
          <td>한줄 상품 설명</td>
          <td>
            <v-text-field
              :value="description"
              @input="setData('description', $event)"
              placeholder="한줄 상품 설명을 입력해주세요."
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <td>
            이미지 등록
            <v-icon x-small color="red">
              mdi-star
            </v-icon>
          </td>
          <td><ImagePriview :setImages.sync="setImages"></ImagePriview></td>
        </tr>
        <tr>
          <td>
            상세 상품 정보
            <v-icon x-small color="red">
              mdi-star
            </v-icon>
          </td>
          <td>
            <editor
              initialEditType="wysiwyg"
              height="500px"
              ref="detailInformation"
            />
          </td>
        </tr>
      </template>
    </DataTable>
  </div>
</template>
<script>
import DataTable from "../../../components/common/DataTable";
import ImagePriview from "../../../components/common/ImagePriview";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/vue-editor";

export default {
  props: {
    images: { type: Array },
    sellerId: { type: Number },
    sellerName: { type: String },
    isSale: { type: Number },
    isDisplay: { type: Number },
    manufacturer: { type: String },
    subCategory: { type: Number },
    productName: { type: String },
    description: { type: String },
    mainCategory: { type: Number },
    isProductNotice: { type: Number },
    manufacturingDate: { type: String },
    productOriginTypeId: { type: Number }
  },
  components: {
    DataTable,
    ImagePriview,
    Editor
  },

  data() {
    return {
      searchSeller: "",
      txtdate: null
    };
  },

  computed: {
    setData() {
      return (param, value) => this.$emit(`update:${param}`, value);
    },
    setCategoryMain() {
      return (param, value) => (
        this.$emit(`update:${param}`, value),
        this.$emit(`update:subCategory`, 0)
      );
    },
    setCategory() {
      return value => this.$store.getters.getCategory[value];
    },
    isLoading() {
      return this.$store.getters.getSellerLodingState;
    },
    getOptions() {
      return this.$store.getters.getOptions.product_origin_types;
    },
    getDetailInfo() {
      return this.$refs.detailInformation;
    },
    setImages: {
      get: function() {
        return this.images;
      },
      set: function(value) {
        this.$emit("update:images", value);
      }
    }
  },

  watch: {
    searchSeller(value) {
      !!value && this.$store.dispatch("searchSeller", value);
    },
    sellerId(value) {
      this.sellerId && this.$store.dispatch("loadMainCategory");
    },
    mainCategory(value) {
      value && this.$store.dispatch("loadSubCategory", value);
    }
  },
  methods: {
    selectSeller(event) {
      confirm("작성된 판매정보는 초기화됩니다. 계속 진행하시겠습니까?")
        ? alert("등록되었습니다")
        : event.stopPropagation();
    }
  }
};
</script>
<style lang="scss" scoped>
.BasicInfo {
  .slectSeller {
    max-width: 25%;
  }

  .categoryTable {
    tr {
      height: 53px;
      td {
        width: 50% !important;
        background-color: white;
      }
    }
  }

  .productNotice {
    margin: 15px 10px 10px 10px;

    div {
      display: flex;
      align-items: center;
      margin: 5px 0;

      span {
        width: 100px;
        margin-right: 10px;
        text-align: center;
      }
    }
  }
  .notice {
    margin-top: 3px;
    color: #1e90ff;
    font-size: 12px;
    font-weight: 500;

    i {
      position: relative;
      top: -2px;
      margin-right: 5px;
      color: #1e90ff;
    }
  }
}
</style>
