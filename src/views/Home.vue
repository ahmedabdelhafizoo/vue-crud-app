<template>
  <div>
    <!-- PageHeader -->
    <PageHeader title="Home"/>
    <!-- end PageHeader -->
    <div class="col d-flex align-items-center text-center">
      <div class="welcome-card col bg-white shadow-sm py-5 mt-5 mx-auto">
        <img src="../assets/welcome.svg" alt="welcom image" class="mw-100">
        <hr class="mb-4" />
        <router-link
          :to="{ name: 'Dishes' }"
          class="btn btn-outline-primary px-4 m-2"
          >Dishes List</router-link
        >
        <router-link
          :to="{ name: 'Customers' }"
          class="btn btn-outline-primary px-4 m-2"
          >Customers List</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome-card {
  max-width: 500px;
}
</style>

<script>
export default {
  name: "Home"
};
</script>
