import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import globalModule from "./globalModule";
import customersModule from "./customersModule";
import dishesModule from "./dishesModule";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    globalModule,
    customersModule,
    dishesModule
  }
});
