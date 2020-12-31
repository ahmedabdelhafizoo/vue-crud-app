import localForage from "localforage";

const state = {
  customersList: null
};

const getters = {
  getCustomersList(state) {
    return state.customersList;
  }
};

const mutations = {
  loadCustomersList(state, payload) {
    state.customersList = payload;
  }
};

const actions = {
  LoadCustomersList({ commit }) {
    commit("globalModule/toggleLoadingStatus", null, { root: true });
    return new Promise((resolve, reject) => {
      localForage
        .getItem("customers")
        .then(value => {
          commit("globalModule/toggleLoadingStatus", null, { root: true });
          let result = value ? value : [];
          commit("loadCustomersList", result);
          console.log(result);
          resolve();
        })
        .catch(() => {
          commit("globalModule/toggleLoadingStatus", null, { root: true });
          reject();
        });
    });
  },
  updateCustomerList({ dispatch, commit, state }, payload) {
    let newCustomerList = [...state.customersList];
    if (payload.mode == "Add") {
      // add new customr
      newCustomerList.unshift(payload.newCustomer);
    } else if (payload.mode == "Edit") {
      // edit customr
      let targetIndex = newCustomerList.findIndex(
        item => item.id === payload.newCustomer.id
      );
      newCustomerList.splice(targetIndex, 1, payload.newCustomer);
    } else if (payload.mode == "Delete") {
      // delete customr
      let targetIndex = newCustomerList.findIndex(
        item => item.id === payload.newCustomer.id
      );
      newCustomerList.splice(targetIndex, 1);
    }
    return new Promise((resolve, reject) => {
      commit("globalModule/toggleLoadingStatus", null, { root: true });
      localForage
        .setItem("customers", newCustomerList)
        .then(() => {
          commit("globalModule/toggleLoadingStatus", null, { root: true });
          // after update customers list then load the updated list as required
          // we also could make commit a mutation for each action instead of loading the list at each action
          return dispatch("LoadCustomersList").then(() => {
            resolve("done");
          });
        })
        .catch(() => {
          commit("globalModule/toggleLoadingStatus", null, { root: true });
          reject("failed");
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
