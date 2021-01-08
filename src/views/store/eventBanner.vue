<template>
  <div class="eventBanner">
    <div class="bannerBox">
      <img :src="event.event_banner_image" alt="dsfdsf" class="image" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["event"],
  mounted() {
    // console.log(this.event);
  }
};
</script>

<style lang="scss" scoped>
.eventBanner {
  margin: 25px 0;
  .bannerBox {
    width: 1198px;
    height: 300px;
    overflow: hidden;
    .image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
