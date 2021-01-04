import axios from "axios";
import mockData from "../../assets/test.json";

// const uri = "http://brandi-intern.tplinkdns.com:9090";
const uri = "http://192.168.40.115:5000";

export default {
  state: {
    filterList: [],
    options: {},
    searchSeller: [],
    searchSellerLodingState: false,
    lodingSpinner: false,
    filterList: {
      is_sale: "", //판매여부
      end_date: "", //조회 끝 날짜
      start_date: "", //조회 시작 날짜
      is_display: "", //진열여부
      product_id: "", //상품번호
      product_code: "", //상품코드
      product_name: "", //상품명
      discount_rate: "", //할인여부
      seller_attribute_type: "" //셀러속성
    },
    categoryList: {
      main: [],
      sub: []
    }
  },
  getters: {
    getFilterList(state) {
      return state.filterList;
    },
    getOptions(state) {
      console.log("|||||||||||||||", state.options);
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
        .then(
          searchList => (
            console.log("셀러", searchList),
            commit("SEARCH_SELLER", searchList.data.result)
          )
        )
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

      formData.append("account_id", 1);
      formData.append("detail_information", productInfo.detailInformation);
      formData.append("seller_id", productInfo.seller);
      formData.append("is_sale", productInfo.isSale);
      formData.append("is_display", productInfo.isDisplay);
      formData.append("main_category_id", productInfo.mainCategory);
      formData.append("sub_category_id", productInfo.subCategory);
      formData.append("is_product_notice", productInfo.isProductNotice);
      formData.append("manufacturer", productInfo.manufacturer);
      formData.append("manufacturing_date", productInfo.manufacturingDate);
      formData.append("product_name", productInfo.productName);
      formData.append("description", productInfo.description);
      formData.append("origin_price", productInfo.originPrice);
      formData.append("discount_rate", productInfo.discountRate);
      formData.append("discounted_price", productInfo.discountedPrice);
      formData.append("discount_start_date", productInfo.discountStartDate);
      formData.append("discount_end_date", productInfo.discountEndDate);
      formData.append("maximum_quantity", productInfo.maximumQuantity);
      formData.append("minimum_quantity", productInfo.minimumQuantity);
      formData.append("options", JSON.stringify(productInfo.options));
      formData.append("detail_information", productInfo.detailInformation);
      formData.append(
        "product_origin_type_id",
        productInfo.productOriginTypeId
      );

      productInfo.images.forEach(img => {
        formData.append("image_files", img);
      });

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
    },

    searchFilterList({ commit }, query) {
      commit("TOGLE_LODING_SPINNER");
      const result = Object.keys(query).reduce((accValue, value, index) => {
        if (query[value]) {
          accValue += index
            ? `&${value}=${query[value]}`
            : `?${value}=${query[value]}`;
        }
        return accValue;
      }, "");

      console.log(result, "++++++|||||");
      console.log(`${uri}/admin/products${result}`);

      axios
        .get(`${uri}/admin/products${result}`)
        .then(res => commit("SET_SEARCH_FILTER_LIST", res.data.result))
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
    },
    SET_SEARCH_FILTER_LIST(state, list) {
      state.filterList = list;
    }
  }
};
