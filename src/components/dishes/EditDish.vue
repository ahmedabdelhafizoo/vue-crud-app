<template>
  <div>
    <DishForm mode="Edit" title="Edit Dish" :dishProp="dish" />
  </div>
</template>

<script>
import DishForm from "./DishForm";
export default {
  name: "AddDish",
  props: {
    dish: {
      required: true
    }
  },
  created() {
    if (!this.dish) {
      this.$router.push({ name: "Dishes" });
    }
  },
  components: {
    DishForm
  }
};
</script>
