<template>
  <div>
    <div class="container">
      <!-- pageNav -->
      <PageNav title="Customers List">
        <button
          slot="nav-actions"
          class="btn btn-primary"
          @click="fireCustomerAction(null, 'Add')"
        >
          Add Customer
        </button>
      </PageNav>
      <!-- end pageNav -->

      <!-- customer table -->
      <div class="table-responsive">
        <template v-if="customersList && customersList.length > 0">
          <table class="table border">
            <thead>
              <tr class="gray-text">
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in customersList" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.age }}</td>
                <td>{{ item.address }}</td>
                <td class="table-action">
                  <b-icon
                    icon="eye-fill"
                    font-scale="2"
                    class="table-icon mx-1"
                    @click="fireCustomerAction(item, 'View')"
                  ></b-icon>
                  <b-icon
                    icon="pencil"
                    font-scale="2"
                    class="table-icon mx-1"
                    @click="fireCustomerAction(item, 'Edit')"
                  ></b-icon>
                  <b-icon
                    icon="trash-fill"
                    font-scale="2"
                    class="table-icon mx-1"
                    @click="showDeleteModal(item)"
                  ></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
        <h6
          class="text-muted text-center mt-5"
          v-else-if="customersList && customersList.length == 0"
        >
          No Customers founded You can add new customers :)
        </h6>
        <h6 class="text-muted text-center mt-5" v-else>
          Sorry try again later :)
        </h6>
      </div>
      <!-- end customer table -->

      <CusomerForm :mode="actionMode" :customer="{ ...activeCustomer }" />

      <ConfirmDeleteModal
        modalTitle="Are you sure you want to delete this customer ?"
        @confirmDelete="confirmDeleteAction"
      />
    </div>
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
import PageNav from "../layout/PageNav";
import CusomerForm from "./CustomerForm";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";

export default {
  name: "CustomersList",
  components: {
    PageNav,
    CusomerForm,
    ConfirmDeleteModal
  },
  computed: {
    customersList() {
      return this.$store.getters["customersModule/getCustomersList"];
    }
  },
  data() {
    return {
      activeCustomer: null,
      actionMode: null
    };
  },
  methods: {
    // handel View & Edit & Add
    fireCustomerAction(customer, mode) {
      this.actionMode = mode;
      mode === "Add"
        ? (this.activeCustomer = { name: null, age: null, address: null })
        : (this.activeCustomer = customer);
      this.$bvModal.show("customer-form-modal");
    },
    showDeleteModal(customer) {
      this.$bvModal.show("confirm-delete-modal");
      this.activeCustomer = customer;
    },
    confirmDeleteAction() {
      this.$bvModal.hide("confirm-delete-modal");
      // update customers list
      this.$store
        .dispatch("customersModule/updateCustomerList", {
          mode: "Delete",
          newCustomer: this.activeCustomer
        })
        .then(() => {
          this.displayToast(
            "Customer Deleted successfully ",
            "Done",
            "success"
          );
        })
        .catch(() => {
          this.displayToast("Please try again ", "Error", "danger");
        });
    }
  },
  created() {
    // load customer list
    this.$store
      .dispatch("customersModule/LoadCustomersList")
      .then(() => {
        console.log("loaded");
      })
      .catch(() => {
        alert("something went wrong please tray again later");
      });
  }
};
</script>
