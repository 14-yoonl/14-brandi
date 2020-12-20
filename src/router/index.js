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
      component: HelloWorld
    },
    {
      path: "/memberManagement",
      name: "MemberManagement",
      component: MemberManagement
    },
    {
      path: "/AdminOrder",
      name: "AdminOrder",
      component: AdminOrder
    }
  ]
});
