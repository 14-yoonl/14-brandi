// import axios from "axios";

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
      axios.post(`${url}/signup`, {
        id: state.id,
        password: state.password,
        email: state.email
      });
    }
  },
  mutations: {
    test(state, info) {
      console.log("store", info);
      console.log("id>>>", info.id);
    }
  }
};
