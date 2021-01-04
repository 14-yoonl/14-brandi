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
    jebal(state, info) {
      console.log(state, info);
      axios.post("http://192.168.40.116:5000/users/signup", {
        username: info.id,
        password: info.password,
        email: info.email,
        phone: "01036464663"
      });
    },
    signin(state, loginInfo) {
      console.log(state, loginInfo);
      axios
        .post("http://192.168.40.116:5000/users/signin", {
          username: loginInfo.id,
          password: loginInfo.pw
        })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          console.log(res.data.token);
          this.$router.push("/");
        });
    }
  },

  mutations: {
    SET_ITEM(state, item) {
      state.item = item;
    }
  }
};
