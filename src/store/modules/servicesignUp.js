import axios from "axios";

const url = "http://localhost:5000";

export default {
  state: {
    id: "",
    password: "",
    email: ""
  },
  actions: {
    test(state, info) {
      console.log(state, info);
      axios
        .post(`${url}/signup`, {
          username: info.id,
          password: info.password,
          email: info.email
        })
        .then(res => res.json())
        .then(localStorage.setItem(res.data.token));
      this.$router.push("/signUpDone");
    }
  },

  mutations: {
    test(state, info) {
      console.log("store", info);
      console.log("id>>>", info.id);
    }
  }
};
