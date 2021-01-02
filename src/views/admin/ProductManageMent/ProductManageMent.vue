<template>
  <div class="MemberManagment">
    <BasicInfo
      ref="test"
      :images.sync="images"
      :seller.sync="seller"
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

export default {
  components: {
    BasicInfo,
    ProductOptions,
    ProductSalesInfo,
    LodingSpinner
  },
  created() {
    this.$store.dispatch("loadOptions");
  },
  data() {
    return {
      seller: 0,
      isSale: 1,
      isDisplay: 1,
      mainCategory: 0,
      subCategory: 0,
      isProductNotice: 0,
      manufacturer: "",
      manufacturingDate: "",
      productOriginTypeId: "",
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
      images: []
    };
  },

  methods: {
    submitData(e) {
      // if (!this.seller) {
      //   alert("셀러 선택은 필수입니다.");
      //   return;
      // }

      // if (!this.mainCategory) {
      //   alert("1차 카테고리는 필수입니다.");
      //   return;
      // }
      // if (!this.subCategory) {
      //   alert("2차 카테고리는 필수입니다.");
      //   return;
      // }

      // if (this.isProductNotice === 1) {
      //   if (!this.manufacturer) {
      //     alert(
      //       "상품 정보 고시 직접입력을 선택하셨으면, 제조사 입력은 필수입니다."
      //     );
      //   } else if (!this.manufacturingDate) {
      //     alert(
      //       "상품 정보 고시 직접입력을 선택하셨으면, 제조사일자는 필수입니다."
      //     );
      //   } else if (!ths.productOriginTypeId) {
      //     alert("상품 정보 고시 직접입력을 선택하셨으면, 원산지는 필수입니다.");
      //   }
      //   return;
      // }

      // if (!this.productName) {
      //   alert("상품명은 필수로 작성해야합니다.");
      //   return;
      // }

      // if (!this.images.length) {
      //   alert("상품 이미지 등록은 필수입니다.");
      //   return;
      // }

      // if (!this.options.length) {
      //   alert("기본옵션을 체크가 되었다면 옵션 정보 입력은 필수 입니다.");
      //   return;
      // }
      // if (!this.originPrice) {
      //   alert("판매가 입력은 필수 입니다.");
      //   return;
      // }

      // if (this.discountState) {
      //   if (!this.discountStartDate || !this.discountEndDate) {
      //     alert("기한설정을 선택하셨으면, 기간선택은 필수 입니다.");
      //   }
      // }

      // if (this.minimumQuantity > 20) {
      //   alert("최소 판매 수량은 20개 초과 입력은 불가능합니다.");
      //   return;
      // }

      // if (this.maximumQuantity > 20) {
      //   alert("최대 판매 수량은 20개 초과 입력은 불가능합니다.");
      //   return;
      // }

      // if (this.maximumQuantity < this.minimumQuantity) {
      //   alert("최소 판매수량은 최대 판매수량 보다 많을 수 없습니다.");
      //   return;
      // }

      const setImages = this.images.reduce((files, file) => {
        files.push(file.file);
        return files;
      }, []);

      const detailInformation = this.$refs.test.getDetailInfo.invoke("getHtml");

      //데이터 vuex로 전송
      this.$store.dispatch("addProduct", {
        ...this.$data,
        ...{ images: setImages },
        detailInformation
      });
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
    },

    mainCategory(value, preValue) {
      this.subCategory = 0;
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
