import axios from "axios";
import API from "../config";
const LOCAL_API = API.API;

console.log(LOCAL_API);
export default {
  state: {
    id: "",
    password: "",
    email: ""
  },
  actions: {
    test(state, info) {
      console.log(state, info);
      axios.post(`${url}/signup`, {
        id: info.id,
        password: info.password,
        email: info.email
      });
    },
    FETCH_USER({ commit }, name) {
      LOCAL_API(name)
        .then(({ data }) => {
          commit("SET_USER", data);
        })
        .catch(error => console.log(error));
    }
  },

  mutations: {
    // test(state, info) {
    //   console.log("store", info);
    //   console.log("id>>>", info.id);
    // },
    SET_ITEM(state, item) {
      state.item = item;
    }
  }
};
