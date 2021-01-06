import axios from "axios";

const postApi = (uri, loginData) => {
  return axios.post(`${process.setting.ENV_ADMIN_LOG_IN_OTU}${uri}`, loginData);
};

export default {
  state: {
    userName: ""
  },
  actions: {
    logIn({ commit }, loginData) {
      return postApi(`/admin/signin`, loginData);
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
