import Vue from "vue";
import Router from "vue-router";

//--admin
import MemberManagement from "@/views/admin/MemberManagement/MemberManagement";
import adminSignIn from "@/views/admin/signIn";
import adminSignUp from "@/views/admin/signUp";
import AdminOrder from "@/views/admin/AdminOrder/AdminOrder";
import ProductManagement from "@/views/admin/ProductManageMent/ProductManageMent";

//--service
import signIn from "@/views/store/SignIn";
import home from "@/views/store/mainPage";

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
      path: "/signIn",
      name: "signIn",
      component: signIn,
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
      component: adminSignUp
    },
    {
      path: "/admin/order",
      name: "AdminOrder",
      component: AdminOrder, //<=== admin home component 추가해야함
      meta: { admin: true }
    },
    {
      path: "/admin/products/regist",
      name: "ProductManagement",
      component: ProductManagement,
      meta: { admin: true }
    }
  ]
});
