// import axios from "axios";

// const uri = "http://localhost:8080";

export default {
  state: {
    filterSelectedCondition: "",
    searchInputData: "",
    payedCompletedDate: "3",
    sellerAttribute: ["전체"],
    selectedsellerAttribute: [],
    sellerType: "전체",
    deliveryType: "전체",
    selectedItems: [],
    startedDate: "",
    currentDate: "",
    currentPage: 1,
    itemsPerPage: 30
  },
  actions: {},
  getters: {
    getState(state) {
      return state;
    }
  },
  mutation: {}
};
