import localForage from "localforage";

const state = {
  dishesList: null
};

const getters = {
  getDishesList(state) {
    return state.dishesList;
  }
};

const mutations = {
  loadDishesList(state, payload) {
    state.dishesList = payload;
  }
};

const actions = {
  LoadDishesList({ commit }) {
    commit("globalModule/toggleLoadingStatus", null, { root: true });
    return new Promise((resolve, reject) => {
      localForage
        .getItem("dishes")
        .then(value => {
          commit("globalModule/toggleLoadingStatus", null, { root: true });
          let result = value ? value : [];
          commit("loadDishesList", result);
          console.log(result);
          resolve();
        })
        .catch(() => {
          commit("globalModule/toggleLoadingStatus", null, { root: true });
          reject();
        });
    });
  },
  updateDishesList({ dispatch, commit, state }, payload) {
    let newDishesList = [...state.dishesList];
    if (payload.mode == "Add") {
      // add new customr
      newDishesList.unshift(payload.newDish);
    } else if (payload.mode == "Edit") {
      // edit customr
      let targetIndex = newDishesList.findIndex(
        item => item.id === payload.newDish.id
      );
      newDishesList.splice(targetIndex, 1, payload.newDish);
    } else if (payload.mode == "Delete") {
      // delete customr
      let targetIndex = newDishesList.findIndex(
        item => item.id === payload.newDish.id
      );
      newDishesList.splice(targetIndex, 1);
    }
    return new Promise((resolve, reject) => {
      commit("globalModule/toggleLoadingStatus", null, { root: true });
      localForage
        .setItem("dishes", newDishesList)
        .then(() => {
          commit("globalModule/toggleLoadingStatus", null, { root: true });
          if (payload.mode == "Delete") {
            //if mode is delete then load the updated dishes list (we still in dishes component)
            return dispatch("LoadDishesList").then(() => {
              resolve("done");
            });
          }
          // in other cases(add, edit) we redirect the user to dishes component which load the updated list in created hook
          resolve("done");
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
