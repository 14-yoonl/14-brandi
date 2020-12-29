import Vue from "vue";
import Vuex from "vuex";
import signIn from "./modules/signIn";
import signUp from "./modules/signUp";
import servicesignUp from "./modules/servicesignUp";

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: { signIn, signUp, servicesignUp }
});

// Vue.use(Vuex);
// export const store = new Vuex.Store({
//   state: {
//     info: {
//       id: ""
//     }
//   },

//   mutations: {
//     test(state, info) {
//       console.log("store", info);
//     }
//   }
// });
