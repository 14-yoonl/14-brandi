import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import MemberManagement from "@/components/MemberManagement/MemberManagement";
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
      path: "/admin/seller",
      name: "seller",
      component: MemberManagement, //<=== admin home component 추가해야함
      meta: { admin: true }
    }
  ]
});
