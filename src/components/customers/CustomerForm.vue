<template>
  <div>
    <div>
      <b-modal
        id="customer-form-modal"
        hide-footer
        :title="modalTitle"
        headerBgVariant="dark"
        headerTextVariant="light"
        centered
        size="md"
        modal-class="form"
      >
        <div>
          <form class="mt-3" ref="customer-form" v-if="customer">
            <h6 class="text-danger text-center" v-if="feedback">
              {{ feedback }}
            </h6>
            <b-form-group
              label-cols="2"
              class="mb-4"
              label="Name"
              label-for="customer-name"
            >
              <b-form-input
                id="customer-name"
                :readonly="mode === 'View'"
                v-model="customer.name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="2"
              class="mb-4"
              label="Age"
              label-for="customer-age"
            >
              <b-form-input
                id="customer-age"
                :readonly="mode === 'View'"
                type="number"
                v-model="customer.age"
                min="1"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="2"
              class="mb-4"
              label="Address"
              label-for="customer-address"
            >
              <b-form-input
                id="customer-address"
                :readonly="mode === 'View'"
                v-model="customer.address"
              ></b-form-input>
            </b-form-group>
          </form>
        </div>
        <div class="text-center">
          <button
            class="mt-3 mr-2 btn btn-success rounded-btn"
            v-if="mode !== 'View'"
            @click="saveAction"
          >
            <span>save</span>
          </button>
          <button
            class="mt-3 btn btn-outline-secondary rounded-btn"
            @click="$bvModal.hide('customer-form-modal')"
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
  name: "CustomerForm",
  props: {
    mode: {
      required: true
    },
    customer: {
      required: true
    }
  },
  computed: {
    modalTitle() {
      return this.mode === "Add"
        ? "Add Customer"
        : this.mode === "View"
        ? "Customer Details"
        : "Edit Customer";
    }
  },
  data() {
    return {
      feedback: null
    };
  },
  methods: {
    quickValidation() {
      let { name, age, address } = this.customer;
      if (name && age && address) {
        this.feedback = null;
      } else {
        this.feedback = "Sorry, Please fill all fields !!";
      }
    },
    addCustomer() {
      let newCustomer = { ...this.customer, id: new Date().getTime() };
      this.$bvModal.hide("customer-form-modal");
      // update customers list
      this.$store
        .dispatch("customersModule/updateCustomerList", {
          mode: "Add",
          newCustomer
        })
        .then(() => {
          this.displayToast("Customer added successfully ", "Done", "success");
        })
        .catch(() => {
          this.displayToast("Please try again ", "Error", "danger");
        });
    },
    editCustomer() {
      let newCustomer = { ...this.customer };
      this.$bvModal.hide("customer-form-modal");
      // update customers list
      this.$store
        .dispatch("customersModule/updateCustomerList", {
          mode: "Edit",
          newCustomer
        })
        .then(() => {
          this.displayToast("Customer Edited successfully ", "Done", "success");
        })
        .catch(() => {
          this.displayToast("Please try again ", "Error", "danger");
        });
    },
    saveAction() {
      this.quickValidation();
      if (!this.feedback) {
        this.mode === "Add" ? this.addCustomer() : this.editCustomer();
      }
    }
  }
};
</script>
