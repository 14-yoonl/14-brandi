<template>
  <div class="LoadingSpinner">
     <img class="spinner" src="../../assets/logo.png" alt='스피너 이미지'></img>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.LoadingSpinner {
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  background-color: rgba(255,255,255,0.8);
  border-radius: 50%;
  padding:50px;


  .spinner {
    transition: all 0.5s;
    backface-visibility: hidden;
    animation: moveSlideshow 0.5s infinite;

    &:hover {
      transform: rotateY(180deg);
    }

    @keyframes moveSlideshow {
      50% {
        transform: rotateY(180deg);
      }
    }
  }
}
</style>
