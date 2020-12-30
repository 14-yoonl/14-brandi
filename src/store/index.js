import Vue from "vue";
import Vuex from "vuex";
import signIn from "./modules/signIn";
import signUp from "./modules/signUp";
import productsRegist from "./modules/productsRegist";

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: { signIn, signUp, productsRegist }
});
