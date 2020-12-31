<template>
  <div>
    <div>
      <b-modal
        id="view-customer-modal"
        hide-footer
        title="Customer Details"
        headerBgVariant="dark"
        headerTextVariant="light"
        centered
        size="md"
      >
        <div v-if="customer">
          <div
            class="d-flex flex-wrap align-items-center py-4 border-bottom"
            v-if="customer.name"
          >
            <h6 class="col m-0 px-1">Name :</h6>
            <p class="m-0 px-1">{{ customer.name }}</p>
          </div>
          <div
            class="d-flex flex-wrap align-items-center py-4 border-bottom"
            v-if="customer.age"
          >
            <h6 class="col m-0 px-1">Age :</h6>
            <p class="m-0 px-1">{{ customer.age }}</p>
          </div>

          <div
            class="d-flex flex-wrap align-items-center py-4"
            v-if="customer.address"
          >
            <h6 class="col m-0 px-1">Address :</h6>
            <p class="m-0 px-1">{{ customer.address }}</p>
          </div>
        </div>
        <div class="text-center">
          <button
            class="mt-3 btn btn-outline-secondary rounded-btn"
            @click="$bvModal.hide('view-customer-modal')"
          >
            Close
          </button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewCustomerModal",
  props: ["customer"]
};
</script>
