<template>
  <div class="bg-white shadow-sm">
    <div class="container-fluid">
      <nav class="d-flex align-items-center py-1">
        <!-- menu-icon -->
        <div class="h1 mr-2 mb-1 menu-icon" @click="toggleSideMenu">
          <b-icon icon="justify"></b-icon>
        </div>

        <!-- title -->
        <span class="navbar-brand text-dark">{{ title }}</span>

        <!-- search box slot -->
        <div class="col-lg-10 ml-auto">
          <slot name="search-box"></slot>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      default: "Home"
    },
    routeName: {
      default: "Home"
    }
  }
};
</script>
