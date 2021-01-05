<template>
  <div class="AdminLayout">
    <adminHeader />
    <div class="mainComponent">
      <adminSideBar></adminSideBar>
      <div class="content"><slot></slot></div>
    </div>
    <adminFooter />
  </div>
</template>

<script>
import adminHeader from "./AdminHeader";
import adminSideBar from "./AdminSideBar";
import adminFooter from "./AdminFooter";

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
    height: 100%;

    .content {
      width: calc(100% - 150px);
      padding: 10px;
      border-radius: 10px 0 0 10px / 10px 0 0 10px;
      background-color: #f3f4f7;
    }
  }
}
</style>
