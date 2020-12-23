<template>
  <div class="AdminLayout">
    <adminHeader />
    <div class="mainComponent"><adminSideBar /><slot /></div>
    <adminFooter />
  </div>
</template>

<script>
import adminHeader from "../common/AdminHeader";
import adminSideBar from "../common/AdminSideBar";
import adminFooter from "../common/AdminFooter";

export default {
  name: "AdminLayout",
  components: { adminHeader, adminSideBar, adminFooter }
};
</script>

<style lang="scss" scoped>
.AdminLayout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #35363a;

  .mainComponent {
    display: flex;
    height: 95%;
  }
}
</style>
