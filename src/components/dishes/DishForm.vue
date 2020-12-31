<template>
  <div>
    <!-- PageHeader -->
    <PageHeader :title="title"></PageHeader>
    <!-- end PageHeader -->

    <form
      class="col-sm-10 col-md-8 col-lg-6 m-auto form"
      @submit.prevent="submitForm"
    >
      <div class="card px-3 my-3">
        <h6 class="text-danger text-center mt-3" v-if="feedback">
          {{ feedback }}
        </h6>
        <div class="form-group">
          <h6 class="my-2">Dish image</h6>
          <img
            alt="dish image"
            width="200"
            height="180"
            src="../../assets/dish.jpg"
          />
        </div>

        <div class="form-group">
          <h6 class="my-2">Dish Name</h6>
          <input
            type="text"
            class="form-control col mr-2"
            v-model="dish.name"
          />
        </div>

        <h6 class="my-2">Ingredients</h6>
        <!-- dish sizes -->
        <div
          class="d-flex align-items-center justify-content-between mb-3 border-bottom"
          v-for="(size, index) in dish.sizes"
          :key="index"
        >
          <label class="m-0">Size</label>
          <input
            type="text"
            class="form-control col mx-2"
            readonly
            :value="size.name"
          />
          <label class="m-0">Price</label>
          <div class="price-input col">
            <input
              type="number"
              class="form-control mx-2"
              readonly
              :value="size.price"
            />
            <small class="currency text-muted">KWD</small>
          </div>
          <button
            class="btn btn-sm btn-dark shadow-none form-icon"
            type="button"
            @click="deleteSize(index)"
          >
            <b-icon icon="trash-fill"></b-icon>
          </button>
        </div>
        <!-- end dish sizes -->

        <!-- add new size -->
        <div
          class="d-flex align-items-center justify-content-between mb-3"
          v-if="allowedSizes.length"
        >
          <label class="m-0">Size</label>
          <select class="custom-select col" v-model="sizeName">
            <option
              v-for="(size, index) in allowedSizes"
              :key="index"
              :value="size"
              >{{ size }}</option
            >
          </select>
          <label class="m-0">Price</label>
          <div class="price-input col">
            <input
              type="number"
              class="form-control mx-2"
              v-model="sizePrice"
            />
            <small class="currency text-muted">KWD</small>
          </div>
          <button
            class="btn btn-sm btn-dark shadow-none form-icon"
            type="button"
            @click="addSize"
          >
            <b-icon icon="plus"></b-icon>
          </button>
        </div>
        <!-- end add new size -->

        <div class="text-center mb-3">
          <button class="mt-4 mr-2 btn btn-success rounded-btn">save</button>
          <button
            type="button"
            class="mt-4 btn btn-outline-secondary rounded-btn"
            v-backBtn
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "DishForm",
  props: ["mode", "title", "dishProp"],
  data() {
    return {
      sizes: ["small", "medium", "large"],
      dish: null,
      sizeName: "",
      sizePrice: "",
      feedback: null
    };
  },
  computed: {
    allowedSizes() {
      // if dish sizes is empty return all available sizes
      if (this.dish.sizes.length == 0) {
        return this.sizes;
      } else {
        // return the size that does not exist in dish sizes
        return this.sizes.filter(item => {
          // does not return any size that exists in dish sizes
          if (!this.dish.sizes.find(size => size.name == item)) {
            return item;
          }
        });
      }
    }
  },
  created() {
    // edit mode
    if (this.dishProp) {
      this.dish = { ...this.dishProp };
    } else {
      // add mode
      this.dish = {
        name: "",
        sizes: []
      };
    }
  },
  methods: {
    addSize() {
      if (this.sizeName && this.sizePrice) {
        this.dish.sizes.push({ name: this.sizeName, price: this.sizePrice });
        this.sizeName = this.sizePrice = "";
      }
    },
    deleteSize(index) {
      this.dish.sizes.splice(index, 1);
    },
    quickValidation() {
      if (this.dish.name && this.dish.sizes.length) {
        this.feedback = null;
      } else {
        this.feedback = "Please enter your name and select at lest one size !!";
      }
    },
    addNewDish() {
      this.dish.id = new Date().getTime();
      console.log(this.dish);
      this.$store
        .dispatch("dishesModule/updateDishesList", {
          mode: "Add",
          newDish: this.dish
        })
        .then(() => {
          this.$router.push({ name: "Dishes" });
          this.$eventBus.$emit("addDish");
        })
        .catch(() => {
          this.displayToast("Please tray again later", "Error", "danger");
        });
    },
    editDish() {
      this.$store
        .dispatch("dishesModule/updateDishesList", {
          mode: "Edit",
          newDish: this.dish
        })
        .then(() => {
          this.$router.push({ name: "Dishes" });
          this.$eventBus.$emit("editDish");
        })
        .catch(() => {
          this.displayToast("Please tray again later", "Error", "danger");
        });
    },
    submitForm() {
      this.quickValidation();
      if (!this.feedback) {
        this.mode === "Add" ? this.addNewDish() : this.editDish();
      }
    }
  }
};
</script>
