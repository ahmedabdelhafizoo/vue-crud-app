const state = {
  sideMenuStatus: false,
  loadingStatus: false
};

const getters = {
  getSideMenuStatus(state) {
    return state.sideMenuStatus;
  },
  getLoadingStatus(state) {
    return state.loadingStatus;
  }
};

const mutations = {
  toggleSideMenuStatus(state) {
    state.sideMenuStatus = !state.sideMenuStatus;
  },
  toggleLoadingStatus(state) {
    state.loadingStatus = !state.loadingStatus;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
