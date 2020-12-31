<template>
  <div>
    <!-- PageHeader -->
    <PageHeader title="Dishes">
      <div slot="search-box">
        <input
          type="search"
          placeholder="Quick search"
          class="form-control shadow-none bg-light"
        />
      </div>
    </PageHeader>
    <!-- end PageHeader -->

    <!-- DishesList -->
    <DishesList />
  </div>
</template>

<script>
import DishesList from "../components/dishes/DishesList";
export default {
  name: "Dishes",
  components: {
    DishesList
  }
};
</script>
