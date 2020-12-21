<template>
  <div id="app">
    <v-App>
      <div v-if="!$route.meta.admin">
        <!-- service header -->
        <router-view />
        <!-- service footer -->
      </div>

      <adminLayout v-if="$route.meta.admin">
        <router-view />
      </adminLayout>
    </v-App>
  </div>
</template>

<script>
import adminLayout from "./components/layout/AdminLayout";

export default {
  name: "App",
  components: {
    adminLayout
  }
};
</script>

<style>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
#app {
  font-family: "Spoqa Han Sans", "sans-serif";
}
</style>
