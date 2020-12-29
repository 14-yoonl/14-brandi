import axios from "axios";

const uri = "http://localhost:8080";

export default {
  actions: {
    signUp(loginData) {
      return axios.post(uri, loginData).then(result => result);
    },
    async test({ commit }, value) {
      return await new Promise(res => {
        setTimeout(() => {
          res(false);
        }, 1000);
      });
    }
  }
};
