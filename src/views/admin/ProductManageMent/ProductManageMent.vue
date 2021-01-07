<template>
  <div class="MemberManagment">
    {{ $data }}
    <BasicInfo
      ref="test"
      :sellerName.sync="sellerName"
      :images.sync="images"
      :sellerId.sync="sellerId"
      :isSale.sync="isSale"
      :isDisplay.sync="isDisplay"
      :productName.sync="productName"
      :description.sync="description"
      :subCategory.sync="subCategory"
      :mainCategory.sync="mainCategory"
      :manufacturer.sync="manufacturer"
      :isProductNotice.sync="isProductNotice"
      :manufacturingDate.sync="manufacturingDate"
      :productOriginTypeId.sync="productOriginTypeId"
    />
    <ProductOptions :options.sync="options" />
    <ProductSalesInfo
      :originPrice.sync="originPrice"
      :discountRate.sync="discountRate"
      :discountedPrice.sync="discountedPrice"
      :discountStartDate.sync="discountStartDate"
      :discountEndDate.sync="discountEndDate"
      :maximumQuantity.sync="maximumQuantity"
      :minimumQuantity.sync="minimumQuantity"
      :discountState.sync="discountState"
    />
    <div class="inputBtn">
      <v-btn color="error ma-3" rounded large>
        <v-icon left> mdi-pencil </v-icon>취소
      </v-btn>
      <v-btn
        class="ma-3"
        large
        color="success"
        rounded
        @click="submitData($event)"
      >
        <v-icon left> mdi-pencil </v-icon>완료
      </v-btn>
      <LodingSpinner v-if="$store.getters.getLodingSpinner" />
    </div>
  </div>
</template>
<script>
import BasicInfo from "./BasicInfo";
import ProductOptions from "./ProductOptions";
import ProductSalesInfo from "./ProductSalesInfo";
import LodingSpinner from "../../../components/common/LodingSpinner";
import mixin from "../../../components/mixins/util";

export default {
  name: "ProductDetail",
  components: {
    BasicInfo,
    ProductOptions,
    ProductSalesInfo,
    LodingSpinner
  },
  created() {
    const getProductKey = this.$route.params.productKey;

    //URI 파라미터의 유무로 데이터 수정 및 입력을 선택
    getProductKey && this.getProductInfo(getProductKey);
    this.$store.dispatch("loadOptions");
  },
  data() {
    return {
      sellerId: "",
      isSale: 1,
      isDisplay: 1,
      mainCategory: 0,
      subCategory: 0,
      isProductNotice: 0,
      manufacturer: "",
      manufacturingDate: "",
      productOriginTypeId: 0,
      productName: "",
      description: "",
      options: [],
      originPrice: 0, //판매가
      discountRate: 0, //할인율
      discountedPrice: 0,
      discountStartDate: "",
      discountEndDate: "",
      maximumQuantity: 0,
      minimumQuantity: 0,
      discountState: false,
      sellerName: "",
      images: []
    };
  },
  mixins: [mixin],
  methods: {
    submitData(e) {
      if (!this.sellerId) {
        alert("셀러 선택은 필수입니다.");
        return;
      }

      if (!this.mainCategory) {
        alert("1차 카테고리는 필수입니다.");
        return;
      }
      if (!this.subCategory) {
        alert("2차 카테고리는 필수입니다.");
        return;
      }

      if (this.isProductNotice === 1) {
        if (!this.manufacturer) {
          alert(
            "상품 정보 고시 직접입력을 선택하셨으면, 제조사 입력은 필수입니다."
          );
        } else if (!this.manufacturingDate) {
          alert(
            "상품 정보 고시 직접입력을 선택하셨으면, 제조사일자는 필수입니다."
          );
        } else if (!this.productOriginTypeId) {
          alert("상품 정보 고시 직접입력을 선택하셨으면, 원산지는 필수입니다.");
        }
        return;
      }

      if (!this.productName) {
        alert("상품명은 필수로 작성해야합니다.");
        return;
      }

      if (!this.images.length) {
        alert("상품 이미지 등록은 필수입니다.");
        return;
      }

      if (!this.options.length) {
        alert("기본옵션을 체크가 되었다면 옵션 정보 입력은 필수 입니다.");
        return;
      }
      if (!this.originPrice) {
        alert("판매가 입력은 필수 입니다.");
        return;
      }

      if (this.discountState) {
        if (!this.discountStartDate || !this.discountEndDate) {
          alert("기한설정을 선택하셨으면, 기간선택은 필수 입니다.");
        }
      }

      if (this.minimumQuantity > 20) {
        alert("최소 판매 수량은 20개 초과 입력은 불가능합니다.");
        return;
      }

      if (this.maximumQuantity > 20) {
        alert("최대 판매 수량은 20개 초과 입력은 불가능합니다.");
        return;
      }

      if (this.maximumQuantity < this.minimumQuantity) {
        alert("최소 판매수량은 최대 판매수량 보다 많을 수 없습니다.");
        return;
      }

      const setImages = this.images.reduce((files, file) => {
        files.push(file.file);
        return files;
      }, []);

      const detailInformation = this.$refs.test.getDetailInfo.invoke("getHtml");

      //데이터 vuex로 전송
      const result = this.$store.dispatch("addProduct", {
        ...this.$data,
        ...{ images: setImages },
        detailInformation
      });

      result
        .then(res => {
          res.data.message === "success" && alert("회원가입을 축하드립니다");
          this.$router.push({
            path: "/admin/products/"
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.$store.commit("TOGLE_LODING_SPINNER");
        });
    },

    getProductInfo(productKey) {
      ///product 수정 페이지에서 사용하는 함수

      try {
        const result = this.$store.dispatch("productInfo", productKey);
        result.then(result => {
          console.log(result);
          const infoOption = result.data.result.product_options;
          const info = {
            ...result.data.result.product_detail,
            ...result.data.result.product_images
          };

          Object.keys(info).forEach(item => {
            if (this.snakeToCamel(item) === "subCategoryId") {
              this.$data["subCategory"] = info[item];
            }
            if (this.snakeToCamel(item) === "mainCategoryId") {
              this.$data["mainCategory"] = info[item];
            } else {
              this.$data[this.snakeToCamel(item)] = info[item];
            }
          });

          infoOption.forEach(item => {
            this.$data["options"].push({
              color: item.color_id,
              size: item.size_id,
              isStockManage: item.stock_id,
              remain: item.remain
            });
          });
        });

        result.finally(() => {
          this.$store.commit("TOGLE_LODING_SPINNER");
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    //할인기간 시작 날짜 입력 체크
    discountStartDate(value) {
      this.discountEndDate &&
        value > this.discountEndDate &&
        alert("시작 날짜는 종료 날짜를 지날 수 없습니다.");

      value === this.discountEndDate &&
        alert("시작 날짜는 종료 날짜와 같을 수 없습니다.");
    },

    //할인기간 종류 날짜 입력 체크
    discountEndDate(value) {
      this.discountStartDate &&
        value < this.discountStartDate &&
        alert("시작 날짜는 종료 날짜를 지날 수 없습니다.");

      value === this.discountStartDate &&
        alert("시작 날짜는 종료 날짜와 같을 수 없습니다.");
    }
  }
};
</script>
<style lang="scss" scoped>
.MemberManagment {
  display: flex;
  flex-direction: column;

  .inputBtn {
    margin: 0 auto;
  }

  >>> .v-input {
    margin: 0;

    .v-icon {
      width: 15px;
      height: 15px;
      margin: auto;
    }

    label {
      font-size: 14px;
    }

    .v-input--selection-controls__ripple {
      width: 25px;
      height: 25px;
      top: calc(50% - 20px) !important;
      left: -8px;
    }

    .v-input__slot {
      margin: 0;
      padding: 0;

      input {
        font-size: 14px;
      }
    }

    .v-messages {
      display: none;
    }

    .v-text-field__details {
      display: none;
    }
  }
}
</style>
