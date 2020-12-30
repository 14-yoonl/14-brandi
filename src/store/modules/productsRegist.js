import axios from "axios";
import mockData from "../../assets/test.json";

export default {
  state: {
    options: "",
    searchSeller: [],
    categoryList: {
      main: [],
      sub: []
    },
    searchSellerLodingState: false
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
    }
  },
  actions: {
    searchSeller({ commit }) {
      commit("TOGLE_SELLER_STAT");
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            result: [
              {
                name: "Sandra Adams",
                avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                seller_id: 32
              },
              {
                name: "Ali Connors",
                avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                seller_id: 43
              },
              {
                name: "Trevor Hansen",
                avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                seller_id: 11
              },
              {
                name: "Tucker Smith",
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                seller_id: 55
              },
              {
                name: "Britta Holt",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                seller_id: 90
              },
              {
                name: "Jane Smith",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                seller_id: 132
              },
              {
                name: "John Smith",
                avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                seller_id: 47
              }
            ]
          });
        }, 1000);
      }).then(searchList => {
        commit("TOGLE_SELLER_STAT"), commit("SEARCH_SELLER", searchList.result);
      });
    },
    loadOptions({ commit }) {
      new Promise((resolve, reject) => {
        resolve(mockData);
      }).then(optionsData => commit("ADD_OPTIONS", optionsData.result));
    },
    loadMainCategory({ commit }) {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            result: [
              {
                pk: 3,
                value: "상의"
              },
              {
                pk: 4,
                value: "하의"
              },
              {
                pk: 33,
                value: "아우터"
              }
            ]
          });
        }, 1000);
      }).then(categoryList =>
        commit("ADD_CATEGORY", { state: "main", value: categoryList.result })
      );
    },
    loadSubCategory({ commit }) {
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            result: [
              {
                pk: 3,
                value: "하위1"
              },
              {
                pk: 4,
                value: "하의2"
              },
              {
                pk: 33,
                value: "서브메뉴2"
              }
            ]
          });
        }, 3000);
      }).then(categoryList =>
        commit("ADD_CATEGORY", { state: "sub", value: categoryList.result })
      );
    }
  },
  mutations: {
    ADD_OPTIONS(state, optionsData) {
      state.options = optionsData;
    },

    SEARCH_SELLER(state, searchSeller) {
      state.searchSeller = searchSeller;
    },
    TOGLE_SELLER_STAT(state) {
      state.searchSellerLodingState = !state.searchSellerLodingState;
    },
    ADD_CATEGORY(state, category) {
      state.categoryList[category.state] = category.value;
    }
  }
};
