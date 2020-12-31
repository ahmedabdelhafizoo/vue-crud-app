<template>
  <div>
    <div class="container">
      <!-- pageNav -->
      <PageNav title="Dishes List">
        <router-link
          :to="{ name: 'AddDish' }"
          slot="nav-actions"
          class="btn btn-primary"
          >Add Dish</router-link
        >
      </PageNav>
      <!-- end pageNav -->

      <!-- dishs list -->
      <div class="row" v-if="dishesList && dishesList.length > 0">
        <div
          class="col-sm-6 col-md-4 col-lg-3 mb-4"
          v-for="dish in dishesList"
          :key="dish.id"
        >
          <div class="card dish">
            <div class="card-image">
              <img
                src="../../assets/dish.jpg"
                class="card-img-top"
                alt="dish image"
              />
              <b-dropdown
                class="dropdown"
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
                right
              >
                <template v-slot:button-content>
                  <b-icon
                    icon="three-dots-vertical"
                    class="rounded-circle bg-white p-1"
                    variant="dark"
                  ></b-icon>
                </template>
                <b-dropdown-item
                  href="#"
                  @click="
                    $router.push({
                      name: 'EditDish',
                      params: { dish }
                    })
                  "
                  >Edit</b-dropdown-item
                >
                <b-dropdown-item href="#" @click.prevent="showDeleteModal(dish)"
                  >Delete</b-dropdown-item
                >
              </b-dropdown>
            </div>
            <div class="card-body">
              <h6 class="m-0">{{ dish.name }}</h6>
            </div>
          </div>
        </div>
      </div>
      <h6
        class="text-muted text-center mt-5"
        v-else-if="dishesList && dishesList.length == 0"
      >
        No Dishes founded You can add new Dishes :)
      </h6>
      <h6 class="text-muted text-center mt-5" v-else>
        Sorry try again later :)
      </h6>
      <!-- end dishs list -->

      <ConfirmDeleteModal
        modalTitle="Are you sure you want to delete this Dish ?"
        @confirmDelete="confirmDeleteAction"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  .card-image {
    position: relative;
    .dropdown {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>

<script>
import PageNav from "../layout/PageNav";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";

export default {
  name: "CustomersList",
  components: {
    PageNav,
    ConfirmDeleteModal
  },
  computed: {
    dishesList() {
      return this.$store.getters["dishesModule/getDishesList"];
    }
  },
  data() {
    return {
      activeDish: null,
      actionMode: null
    };
  },
  methods: {
    showDeleteModal(dish) {
      this.$bvModal.show("confirm-delete-modal");
      this.activeDish = dish;
    },
    confirmDeleteAction() {
      this.$bvModal.hide("confirm-delete-modal");
      // update dishes list
      this.$store
        .dispatch("dishesModule/updateDishesList", {
          mode: "Delete",
          newDish: this.activeDish
        })
        .then(() => {
          this.displayToast("Dish Deleted successfully ", "Done", "success");
        })
        .catch(() => {
          this.displayToast("Please try again ", "Error", "danger");
        });
    }
  },
  created() {
    // load dishes list
    this.$store
      .dispatch("dishesModule/LoadDishesList")
      .then(() => {
        console.log("loaded");
        //to prevent repeating the event
        this.$eventBus.$off();
        this.$eventBus.$on("addDish", () => {
          this.displayToast("Dish added successfully", "Done", "success");
        });
        this.$eventBus.$on("editDish", () => {
          this.displayToast("Dish edited successfully", "Done", "success");
        });
      })
      .catch(() => {
        alert("something went wrong please tray again later");
      });
  }
};
</script>
