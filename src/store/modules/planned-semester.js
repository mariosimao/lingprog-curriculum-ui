import {
  getSemesters,
  createSemester,
  updateSemester,
  removeSemester,
} from '../../api/planned-semester';

export default {
  namespaced: true,
  state: {
    semesters: [],
    semestersStatus: {},
  },
  getters: {
    semesters(state) {
      return state.user;
    },
    semester: (state) => (semesterId) => (state.semesters.find((s) => s.id === semesterId)),
  },
  mutations: {
    SET_SEMESTERS(state, semesters) {
      state.semesters = semesters;
    },
    ADD_SEMESTER(state, semester) {
      const { semesters } = state;
      semesters.push(semester);

      semesters.sort((a, b) => {
        if (a.startDate < b.startDate) {
          return -1;
        }

        if (a.startDate > b.startDate) {
          return 1;
        }

        return 0;
      });

      state.semesters = semesters;
    },
    REMOVE_SEMESTER(state, semesterId) {
      state.semesters = state.semesters.filter((s) => (s.id !== semesterId));

      state.semestersStatus = state.semestersStatus.filter(
        (status, id) => (id !== semesterId),
      );
    },
    UPDATE_SEMESTER(state, semester) {
      const index = state.semesters.findIndex((s) => (s.id === semester.id));

      state.semesters[index] = semester;
    },
    RESET_SEMESTERS_STATUS(state) {
      const semestersStatus = {};
      state.semesters.forEach((semester) => {
        semestersStatus[semester.id] = 'loaded';
      });

      state.semestersStatus = semestersStatus;
    },
    SET_SEMESTER_LOADING(state, semesterId) {
      state.semestersStatus[semesterId] = 'loading';
    },
    SET_SEMESTER_LOADED(state, semesterId) {
      state.semestersStatus[semesterId] = 'loaded';
    },
  },
  actions: {
    fetchSemesters({ commit }, studentId) {
      getSemesters(studentId).then((semesters) => {
        commit('SET_SEMESTERS', semesters);
      });
    },
    addSemester({ commit }, { studentId, startDate, endDate }) {
      createSemester(studentId, startDate, endDate).then((semester) => {
        commit('SET_SEMESTER_LOADED', semester.id);
        commit('ADD_SEMESTER', semester);
      });
    },
    updateSemester({ commit }, { studentId, semester }) {
      const oldSemester = semester(semester.id);

      commit('SET_SEMESTER_LOADING', semester.id);
      commit('UPDATE_SEMESTER', semester);
      updateSemester(studentId, ...semester).then(() => {
        commit('SET_SEMESTER_LOADED', semester.id);
      }).catch(() => {
        commit('UPDATE_SEMESTER', oldSemester);
        commit('SET_SEMESTER_LOADED', semester.id);
      });
    },
    removeSemester({ commit }, { studentId, semesterId }) {
      commit('SET_SEMESTER_LOADING', semesterId);
      removeSemester(studentId, semesterId).then(() => {
        commit('REMOVE_SEMESTER', semesterId);
      });
    },
  },
};
