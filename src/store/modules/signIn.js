import axios from "axios";

const uri = "http://localhost:8080";

export default {
  state: {
    token: "",
    userName: ""
  },
  actions: {
    logIn({ commit }, loginData) {
      axios.post(uri, loginData).then(result => commit("ADD_STATE", result));
    },
    logOut({ commit }) {
      commit("LOGOUT");
    }
  },
  mutation: {
    ADD_STATE(state, userData) {
      state.token = userData.token;
      state.userName = userData.userName;
    },
    LOGOUT(state) {
      state.token = "";
      state.userName = "";
    }
  }
};
