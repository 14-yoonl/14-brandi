import axios from "axios";

const url = "http://localhost:5000";

export default {
  state: {
    id: "",
    password: "",
    email: ""
  },
  actions: {
    test() {
      axios.post(`${url}/signup`, {
        id: this.state.id,
        password: this.state.password,
        email: this.state.email
      });
    }
  }
};
