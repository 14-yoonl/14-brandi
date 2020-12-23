import Vue from "vue";
import Vuex from "vuex";
import signIn from "./modules/signIn";
import signUp from "./modules/signUp";

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: { signIn, signUp }
});
