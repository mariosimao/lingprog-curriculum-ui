import { createStudent } from '../../api/student';

export default {
  namespaced: true,
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    userId(state) {
      return state.user.data.uid;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    registerUser(context, uid) {
      return createStudent(uid);
    },
    updateUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null);
      if (user) {
        commit('SET_USER', {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        commit('SET_USER', null);
      }
    },
  },
};
