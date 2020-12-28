<template>
  <div>
    <NavBar></NavBar>

    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../NavBar";
import Footer from "../footer";

export default {
  data() {
    return {};
  },
  components: {
    NavBar: NavBar,
    Footer: Footer,
  },
};
</script>

<style lang="scss" scoped>
</style>