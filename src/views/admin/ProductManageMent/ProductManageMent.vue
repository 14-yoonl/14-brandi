<template>
  <div class="MemberManagment">
    <BasicInfo></BasicInfo>
    <ProductOptions></ProductOptions>
    <ProductSalesInfo></ProductSalesInfo>
  </div>
</template>
<script>
import BasicInfo from "./BasicInfo";
import ProductOptions from "./ProductOptions";
import ProductSalesInfo from "./ProductSalesInfo";

export default {
  components: {
    BasicInfo,
    ProductOptions,
    ProductSalesInfo
  },
  created() {
    this.$store.dispatch("loadOptions");
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
>>> .v-input {
  margin: 0;
  padding: 0;

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
</style>
