import Vue from "vue";
import Router from "vue-router";

//--admin

import MemberManagement from "@/views/admin/MemberManagement/MemberManagement";
import adminSignIn from "@/views/admin/signIn";
import adminSignUp from "@/views/admin/signUp";
import AdminPrepareOrder from "@/views/admin/OrderManagement/PrepareOrder";
import ProductManagement from "@/views/admin/ProductManageMent/ProductManageMent";
import AdminHome from "@/views/admin/Home/AdminHome";
import ProductManageList from "@/views/admin/ProductManageMent/ProductManageList";
import AdminInDelivery from "@/views/admin/OrderManagement/InDelivery";
import AdminDoneDelivery from "@/views/admin/OrderManagement/DoneDelivery";
import AdminConfirmOrder from "@/views/admin/OrderManagement/ConfirmOrder";

//--service
import signIn from "@/views/store/SignIn";
import home from "@/views/store/mainPage";

//--service_signup

import signUpDone from "@/views/store/signupprocess/signUpDone";
import productsDetail from "@/views/store/products/productsDetail";
import signUp from "@/views/store/signupprocess/signUp";
import getInfo from "@/views/store/signupprocess/getInfo";
import thirdStep from "@/views/store/signupprocess/thirdStep";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: { admin: false }
    },
    {
      path: "/products/:id",
      // path: "/products",
      name: "productsDetail",
      component: productsDetail
    },
    {
      path: "/signIn",
      name: "signIn",
      component: signIn,
      meta: { admin: false }
    },
    {
      path: "/signUp",
      name: "signUp",
      component: signUp,
      meta: { admin: false }
    },
    {
      path: "/getInfo",
      name: "getInfo",
      component: getInfo,
      meta: { admin: false }
    },
    {
      path: "/thirdStep",
      name: "thirdStep",
      component: thirdStep,
      meta: { admin: false }
    },

    {
      path: "/detail",
      name: "productsDetail",
      component: productsDetail,
      meta: { admin: false }
    },

    {
      path: "/signUpDone",
      name: "signUpDone",
      component: signUpDone,
      meta: { admin: false }
    },
    {
      path: "/admin/seller",
      name: "seller",
      component: MemberManagement,
      meta: { admin: true }
    },
    {
      path: "/admin/signin",
      name: "adminSignIn",
      component: adminSignIn
    },
    {
      path: "/admin/signup",
      name: "signUp",
      component: adminSignUp,
      meta: { admin: true }
    },
    {
      path: "/admin/prepareOrder",
      name: "AdminPrepareOrder",
      component: AdminPrepareOrder,
      meta: { admin: true }
    },
    {
      path: "/admin/products/regist",
      name: "ProductManagement",
      component: ProductManagement,
      meta: { admin: true }
    },
    {
      path: "/admin/products/:id",
      name: "ProductDetail",
      component: ProductManagement,
      meta: { admin: true }
    },
    {
      path: "/admin/home",
      name: "AdminHome",
      component: AdminHome,
      meta: { admin: true }
    },
    {
      path: "/admin/products",
      name: "ProductManageList",
      component: ProductManageList
    },
    {
      path: "/admin/inDelivery",
      name: "AdminInDelivery",
      component: AdminInDelivery,
      meta: { admin: true }
    },
    {
      path: "/admin/doneDelivery",
      name: "AdminDoneDelivery",
      component: AdminDoneDelivery,
      meta: { admin: true }
    },
    {
      path: "/admin/confirmOrder",
      name: "AdminConfirmOrder",
      component: AdminConfirmOrder,
      meta: { admin: true }
    }
  ]
});
