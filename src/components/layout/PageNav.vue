<template>
  <div class="row justify-content-between mt-4 mb-3">
    <div class="col d-flex align-items-center mb-2">
      <b-icon
        icon="arrow-left-short"
        class="rounded-circle bg-white h1 m-0 mr-3 arrow-icon"
        v-backBtn
      ></b-icon>

      <h4 class="m-0 title" v-if="title">{{ title }}</h4>
    </div>
    <div class="px-3 mb-2">
      <slot name="nav-actions"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.arrow-icon {
  cursor: pointer;
}
.title {
  font-size: 20px;
}
</style>

<script>
export default {
  name: "PageNav",
  props: ["title"]
};
</script>
