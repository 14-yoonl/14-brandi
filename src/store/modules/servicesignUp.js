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
    signin() {
      axios
        .post("http://192.168.40.116:5000/users/signin", {
          username: "kyouk1a",
          password: "1q2w3e$R"
        })
        .then(res => console.log(res))
        .then(localStorage.setItem("token", res.data.token));
      // this.$router.push("/signUpDone");
    }
    // FETCH_USER({ commit }, name) {
    //   LOCAL_API(name)
    //     .then(({ data }) => {
    //       commit("SET_USER", data);
    //     })
    //     .catch(error => console.log(error));
    // }
  },

  mutations: {
    SET_ITEM(state, item) {
      state.item = item;
    }
  }
};
