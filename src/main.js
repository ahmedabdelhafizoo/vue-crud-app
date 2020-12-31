import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// Global event bus
Vue.prototype.$eventBus = new Vue();

// BootstrapVue
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";

Vue.use(BootstrapVueIcons);
Vue.use(BootstrapVue);

// main style
import "../src/sass/main.scss";

// global components
import PageHeader from "./components/layout/PageHeader.vue";
Vue.component("PageHeader", PageHeader);

// global mixin
Vue.mixin({
  methods: {
    toggleSideMenu() {
      this.$store.commit("globalModule/toggleSideMenuStatus");
    },
    displayToast(msg, title, type) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: type,
        solid: true
      });
    }
  }
});

// custom directive for back btn
Vue.directive("backBtn", {
  bind: function(el) {
    el.addEventListener("click", () => {
      router.go(-1);
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
