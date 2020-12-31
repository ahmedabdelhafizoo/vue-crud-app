import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Customers from "../views/Customers.vue";
import Dishes from "../views/Dishes.vue";
import AddDish from "../components/dishes/AddDish.vue";
import EditDish from "../components/dishes/EditDish.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Customers",
    name: "Customers",
    component: Customers
  },
  {
    path: "/Dishes",
    name: "Dishes",
    component: Dishes
  },
  {
    path: "/Dishes/Add",
    name: "AddDish",
    component: AddDish,
    // to make sure that we load old dishes list before update
    beforeEnter: (to, from, next) => {
      if (from.name == "Dishes") {
        next();
      } else {
        next({ name: "Dishes" });
      }
    }
  },
  {
    path: "/Dishes/Edit",
    name: "EditDish",
    component: EditDish,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
