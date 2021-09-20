import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import plannedSemester from './modules/planned-semester';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    plannedSemester,
  },
});
