<template>
  <div id="app">
    <!-- loading -->
    <LoadingOverlay v-if="loadingStatus" />

    <!-- side menu -->
    <SideMenu />

    <router-view />
  </div>
</template>

<style lang="scss"></style>

<script>
import LoadingOverlay from "./components/shared/LoadingOverlay";
import SideMenu from "./components/layout/SideMenu";

export default {
  components: {
    LoadingOverlay,
    SideMenu
  },
  computed: {
    loadingStatus() {
      return this.$store.getters["globalModule/getLoadingStatus"];
    }
  }
};
</script>
