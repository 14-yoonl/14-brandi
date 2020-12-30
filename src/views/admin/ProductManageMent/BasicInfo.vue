<template>
  <div class="BasicInfo">
    <DataTable>
      <template v-slot:header>기본 정보</template>
      <template v-slot:body>
        <tr>
          <td>셀러 선택</td>
          <td>
            <v-autocomplete
              v-model="seller"
              :loading="isLoading"
              :items="$store.getters.getSearchList"
              :search-input.sync="searchSeller"
              chips
              :label="seller ? `` : `셀러를 선택하세요`"
              item-text="name"
              item-value="seller_id"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar @click="selectSeller">
                    <img :src="data.item.avatar" />
                  </v-list-item-avatar>
                  <v-list-item-content @click="selectSeller">
                    <v-list-item-title
                      v-html="data.item.name"
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
            <v-radio-group v-model="isSale" row>
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
            <v-radio-group v-model="isDisplay" row>
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
          <td>카테고리</td>
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
                      v-model="mainCategory"
                      :items="setCategory('main')"
                      item-text="value"
                      item-value="pk"
                      :label="!mainCategory && '1차 카테고리를 선택해주세요.'"
                    ></v-select>
                  </td>
                  <td>
                    <v-select
                      v-model="subCategory"
                      :items="setCategory('sub')"
                      item-text="value"
                      item-value="pk"
                      :label="
                        mainCategory
                          ? !subCategory && '2차 카테고리를 선택해주세요.'
                          : '1차 카테고리를 먼저 선택해주세요.'
                      "
                    ></v-select>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>상품 정보 고시</td>
          <td>
            <v-radio-group v-model="isProductNotice" row>
              <v-radio :label="`상품상세 참조`" :value="1"></v-radio>
              <v-radio :label="`직접입력`" :value="0"></v-radio>
            </v-radio-group>
            <div class="productNotice" v-if="!isProductNotice">
              <div>
                <span>제조사(수입사) : </span>
                <v-text-field
                  v-model="manufacturer"
                  placeholder="한줄 상품 설명을 입력해주세요."
                ></v-text-field>
              </div>
              <div>
                <span>제조일자 :</span>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="manufacturingDate"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      :label="!manufacturingDate && `제조일자를 선택해주세요.`"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
              <div>
                <span>원산지 : </span>
                <v-select
                  v-model="productOriginTypeId"
                  :items="setCategory('main')"
                  item-text="value"
                  item-value="pk"
                  :label="!productOriginTypeId && '원산지를 입력해주세요.'"
                ></v-select>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>상품명</td>
          <td>
            <v-text-field
              v-model="productName"
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
              v-model="description"
              placeholder="한줄 상품 설명을 입력해주세요."
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <td>대표 이미지 등록</td>
          <td><ImagePriview></ImagePriview></td>
        </tr>
        <tr>
          <td>이미지 등록</td>
          <td><ImagePriview :type="`multiple`"></ImagePriview></td>
        </tr>
        <tr>
          <td>상세 상품 정보</td>
          <td>
            <iframe
              width="100%"
              height="400"
              scrolling="yes"
              contenteditable="true"
              spellcheck="true"
            >
            </iframe>
          </td>
        </tr>
      </template>
    </DataTable>
    <ProductOptions></ProductOptions>
    <ProductSalesInfo></ProductSalesInfo>
  </div>
</template>
<script>
import DataTable from "../../../components/common/DataTable";
import ImagePriview from "../../../components/common/ImagePriview";

export default {
  components: {
    DataTable,
    ImagePriview
  },
  created() {},
  data() {
    return {
      seller: 0, //선택된 셀러
      searchSeller: 0,
      isSale: 1,
      isDisplay: 1,
      mainCategory: 0,
      subCategory: 0,
      isProductNotice: 1,
      manufacturer: "",
      manufacturingDate: "",
      productOriginTypeId: "",
      productName: "",
      description: ""
    };
  },
  computed: {
    setCategory() {
      return value => this.$store.getters.getCategory[value];
    },
    isLoading() {
      return this.$store.getters.getSellerLodingState;
    }
  },
  watch: {
    searchSeller(value) {
      !!value && this.$store.dispatch("searchSeller", value);
    },
    seller(value) {
      value && this.$store.dispatch("loadMainCategory");
    },
    mainCategory(value) {
      value && this.$store.dispatch("loadSubCategory");
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
      height: 35px;
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
        margin-right: 10px;
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
