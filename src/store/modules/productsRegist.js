import axios from "axios";
import mockData from "../../assets/test.json";

const uri = "http://brandi-intern.tplinkdns.com:9090";

export default {
  state: {
    options: {},
    searchSeller: [],
    categoryList: {
      main: [],
      sub: []
    },
    searchSellerLodingState: false,
    lodingSpinner: false
  },
  getters: {
    getOptions(state) {
      return state.options;
    },
    getSearchList(state) {
      return state.searchSeller;
    },
    getSellerLodingState(state) {
      return state.searchSellerLodingState;
    },
    getCategory(state) {
      return state.categoryList;
    },
    getLodingSpinner(state) {
      return state.lodingSpinner;
    }
  },
  actions: {
    loadOptions({ commit }) {
      axios
        .get(`${uri}/admin/product/productRegist`)
        .then(options => commit("ADD_OPTIONS", options.data.result));
    },
    searchSeller({ commit }, searchValue) {
      commit("TOGLE_SELLER_STATE");
      axios
        .get(`${uri}/admin/product/productRegist?seller_name=${searchValue}`)
        .then(searchList => commit("SEARCH_SELLER", searchList.data.result))
        .finally(() => commit("TOGLE_SELLER_STATE"));
    },
    loadMainCategory({ commit }) {
      axios
        .get(`${uri}/admin/product/productRegist/main_category`)
        .then(categoryList =>
          commit("ADD_CATEGORY", {
            state: "main",
            value: categoryList.data.result
          })
        );
    },
    loadSubCategory({ commit }, searchValue) {
      axios
        .get(
          `${uri}/admin/product/productRegist?main_category_id=${searchValue}`
        )
        .then(categoryList =>
          commit("ADD_CATEGORY", {
            state: "sub",
            value: categoryList.data.result
          })
        );
    },

    addProduct({ commit }, productInfo) {
      commit("TOGLE_LODING_SPINNER");
      const formData = new FormData();

      console.log(":>>>>", productInfo.detailInformation);

      formData.append("account_id", 1);
      formData.append("detail_information", productInfo.detailInformation);

      // formData.append("seller_id", productInfo.seller);
      // formData.append("is_sale", productInfo.isSale);
      // formData.append("is_display", productInfo.isDisplay);
      // formData.append("main_category_id", productInfo.mainCategory);
      // formData.append("sub_category_id", productInfo.subCategory);
      // formData.append("is_product_notice", productInfo.isProductNotice);
      // formData.append("manufacturer", productInfo.manufacturer);
      // formData.append("manufacturing_date", productInfo.manufacturingDate);
      // formData.append("product_name", productInfo.productName);
      // formData.append("description", productInfo.description);
      // formData.append("origin_price", productInfo.originPrice);
      // formData.append("discount_rate", productInfo.discountRate);
      // formData.append("discounted_price", productInfo.discountedPrice);
      // formData.append("discount_start_date", productInfo.discountStartDate);
      // formData.append("discount_end_date", productInfo.discountEndDate);
      // formData.append("maximum_quantity", productInfo.maximumQuantity);
      // formData.append("minimum_quantity", productInfo.minimumQuantity);
      // formData.append("options", JSON.stringify(productInfo.options));
      // formData.append("detail_information", productInfo.detailInformation);
      // formData.append(
      //   "product_origin_type_id",
      //   productInfo.productOriginTypeId
      // );

      // productInfo.images.forEach(img => {
      //   formData.append("image_files", img);
      // });

      // ////-------------

      axios
        .post(`${uri}/admin/product/productRegist`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => console.log("최종결과", res))
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          commit("TOGLE_LODING_SPINNER");
        });
    }
  },
  mutations: {
    ADD_OPTIONS(state, optionsData) {
      state.options = optionsData;
    },

    SEARCH_SELLER(state, searchSeller) {
      state.searchSeller = searchSeller;
    },
    TOGLE_SELLER_STATE(state) {
      state.searchSellerLodingState = !state.searchSellerLodingState;
    },
    ADD_CATEGORY(state, category) {
      state.categoryList[category.state] = category.value;
    },
    TOGLE_LODING_SPINNER(state) {
      state.lodingSpinner = !state.lodingSpinner;
    }
  }
};
