import axios from "axios";

const uri = "http://localhost:8080";

export default {
  actions: {
    signUp(loginData) {
      return axios.post(uri, loginData).then(result => result);
    }
  }
};
