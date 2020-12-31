<template>
  <div>
    <!-- PageHeader -->
    <PageHeader title="Customers">
      <div slot="search-box">
        <input
          type="search"
          placeholder="Quick search"
          class="form-control shadow-none bg-light"
        />
      </div>
    </PageHeader>
    <!-- end PageHeader -->

    <!-- customersList -->
    <CustomersList />
  </div>
</template>

<style lang="scss" scoped>
.table {
  background: #fff;

  .table-icon {
    cursor: pointer;
    padding: 5px;
  }
}
</style>

<script>
import CustomersList from "../components/customers/CustomersList";

export default {
  name: "Customers",
  components: {
    CustomersList
  }
};
</script>
