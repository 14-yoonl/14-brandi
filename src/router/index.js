import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import MemberManagement from "@/components/MemberManagement/MemberManagement";
import AdminOrder from "@/components/AdminOrder/AdminOrder";
import signIn from "@/components/Service/SignIn";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/signIn",
      name: "signIn",
      component: signIn,
      meta: { admin: false }
    },
    {
      path: "/admin/seller",
      name: "seller",
      component: MemberManagement, //<=== admin home component 추가해야함
      meta: { admin: true }
    },
    {
      path: "/admin/order",
      name: "AdminOrder",
      component: AdminOrder, //<=== admin home component 추가해야함
      meta: { admin: true }
    }
  ]
});
