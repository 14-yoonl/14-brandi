import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import MemberManagement from "@/components/MemberManagement/MemberManagement";
import AdminOrder from "@/components/AdminOrder";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
      meta: { admin: false }
    },
    {
      path: "/admin/seller",
      name: "seller",
      component: MemberManagement, //<=== admin home component 추가해야함
      meta: { admin: true }
    }
  ]
});
