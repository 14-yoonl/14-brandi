import axios from "axios";
import mockData from "../../assets/main.json";

const getApi = uri => {
  return axios.get(`${process.setting.ENV_ADMIN_PRODUCT}${uri}`, {
    headers: {
      Authorization: sessionStorage.getItem("token")
    }
  });
};

const postApi = (uri, data) => {
  return axios.post(`${process.setting.ENV_ADMIN_PRODUCT}${uri}`, data, {
    headers: {
      Authorization: sessionStorage.getItem("token")
    }
  });
};

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
    //상품등록 기본 선택 버튼 리스트 호출
    loadOptions({ commit }) {
      try {
        const result = getApi(`/admin/product/productRegist`);
        result.then(options => commit("ADD_OPTIONS", options.data.result));
      } catch (err) {
        console.log(err);
      }
    },

    //상품등록 셀러 검색시 데이터 호출
    searchSeller({ commit }, searchValue) {
      try {
        commit("TOGLE_SELLER_STATE");
        const result = getApi(
          `/admin/product/productRegist?seller_name=${searchValue}`
        );
        result
          .then(searchList => commit("SEARCH_SELLER", searchList.data.result))
          .finally(() => commit("TOGLE_SELLER_STATE"));
      } catch (err) {
        console.log(err);
      }
    },

    //상품등록 메인 카테고리 리스트 호출
    loadMainCategory({ commit }) {
      commit("ADD_CATEGORY", {
        state: "main",
        value: mockData.result
      });
    },

    //상품등록 서브 카테고리 리스트 호출
    loadSubCategory({ commit }, searchValue) {
      try {
        const result = getApi(
          `/admin/product/productRegist?main_category_id=${searchValue}`
        );
        result.then(searchList =>
          commit("ADD_CATEGORY", {
            state: "sub",
            value: searchList.data.result
          })
        );
      } catch (err) {
        console.log(err);
      }
    },

    //상품 등록
    addProduct({ commit }, productInfo) {
      commit("TOGLE_LODING_SPINNER");
      const formData = new FormData();

      formData.append("account_id", 1);
      formData.append("detail_information", productInfo.detailInformation);
      formData.append("seller_id", productInfo.sellerId);
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

      return postApi(`/admin/product/productRegist`, formData);
    },

    //검색 필터 리스트
    searchFilterList({ commit }, query) {
      commit("TOGLE_LODING_SPINNER");

      const queryString =
        "limit" in query && "page_number" in query
          ? Object.keys(query).reduce((accValue, value, index) => {
              if (query[value]) {
                accValue += index
                  ? `&${value}=${query[value]}`
                  : `?${value}=${query[value]}`;
              }
              return accValue;
            }, "")
          : "?limit=10&page_number=1";

      const result = getApi(`/admin/products${queryString}`);
      result
        .then(res => commit("SET_SEARCH_FILTER_LIST", res.data.result))
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          commit("TOGLE_LODING_SPINNER");
        });
    },

    //상품 디테일,수정을 위한 데이터 호출
    productInfo({ commit }, product_id) {
      commit("TOGLE_LODING_SPINNER");

      return getApi(`/admin/products/${product_id}`);
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
