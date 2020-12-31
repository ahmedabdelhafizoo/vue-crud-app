<template>
  <div class="d-flex align-items-center justify-content-center loading-overlay">
    <b-spinner variant="light" label="Spinning"></b-spinner>
  </div>
</template>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .spinner-border {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>

<script>
export default {
  name: "loadingOverlay"
};
</script>
