import Vue from "vue";
import Vuex from "vuex";
import signIn from "./modules/signIn";
import signUp from "./modules/signUp";
import productsRegist from "./modules/productsRegist";
import servicesignUp from "./modules/servicesignUp";
import adminOrder from "./modules/AdminOrder";

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: { signIn, signUp, servicesignUp, productsRegist, adminOrder }
});
