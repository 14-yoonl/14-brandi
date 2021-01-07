import axios from "axios";
import API from "../config";
const LOCAL_API = API.API;

console.log(LOCAL_API);
export default {
  state: {
    id: "",
    password: "",
    email: "",
    phone: "01036464663"
  },
  actions: {
    brandiLogin(state, info) {
      axios.post(`${LOCAL_API}/users/signup`, {
        username: info.id,
        password: info.password,
        email: info.email,
        phone: "01036464663"
      });
    },
    signin(state, loginInfo) {
      console.log(state, loginInfo);
      axios
        .post(`${LOCAL_API}/users/signin`, {
          username: loginInfo.id,
          password: loginInfo.pw
        })
        .then(res => {
          localStorage.setItem("token", res.data.token);
        })
        .then(alert("loginSuccess"));
    }
  },

  mutations: {
    SET_ITEM(state, item) {
      state.item = item;
    }
  }
};
