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
    semestersStatus: 'pending',
    semesterStatus: {}, // Status per semester
  },
  getters: {
    semesters(state) {
      return state.semesters;
    },
    semester: (state) => (semesterId) => (state.semesters.find((s) => s.id === semesterId)),
    isSemesterLoading: (state) => (semesterId) => (state.semesterStatus[semesterId] === 'loading'),
    areSemestersLoaded(state) {
      return state.semestersStatus === 'loaded';
    },
    areSemestersLoading(state) {
      return state.semestersStatus === 'loading';
    },
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

      const status = { ...state.semesterStatus };
      delete status[semesterId];
      state.semesterStatus = status;
    },
    UPDATE_SEMESTER(state, semester) {
      const index = state.semesters.findIndex((s) => (s.id === semester.id));

      const semesters = [...state.semesters];
      semesters[index] = semester;

      state.semesters = semesters;
    },
    RESET_SEMESTERS_STATUS(state) {
      const semesterStatus = {};
      state.semesters.forEach((semester) => {
        semesterStatus[semester.id] = 'loaded';
      });

      state.semesterStatus = semesterStatus;
    },
    SET_SEMESTER_LOADING(state, semesterId) {
      state.semesterStatus = {
        ...state.semesterStatus,
        [semesterId]: 'loading',
      };
    },
    SET_SEMESTER_LOADED(state, semesterId) {
      state.semesterStatus = {
        ...state.semesterStatus,
        [semesterId]: 'loaded',
      };
    },
    SET_SEMESTERS_STATUS(state, status) {
      state.semestersStatus = status;
    },
  },
  actions: {
    fetchSemesters({ commit }, studentId) {
      commit('SET_SEMESTERS_STATUS', 'loading');
      getSemesters(studentId).then((semesters) => {
        commit('SET_SEMESTERS', semesters);
        commit('SET_SEMESTERS_STATUS', 'loaded');
      }).catch(() => {
        commit('SET_SEMESTERS_STATUS', 'error');
      });
    },
    planSemester({ commit }, { studentId, startDate, endDate }) {
      return createSemester(studentId, startDate, endDate).then((semester) => {
        commit('SET_SEMESTER_LOADED', semester.id);
        commit('ADD_SEMESTER', semester);
      });
    },
    updateSemester({ commit }, { studentId, semester }) {
      commit('SET_SEMESTER_LOADING', semester.id);
      return updateSemester(
        studentId,
        semester.id,
        semester.name,
        semester.startDate,
        semester.endDate,
      ).then(() => {
        commit('UPDATE_SEMESTER', semester);
        commit('SET_SEMESTER_LOADED', semester.id);
      }).catch((e) => {
        commit('SET_SEMESTER_LOADED', semester.id);
        throw e;
      });
    },
    removeSemester({ commit }, { studentId, semesterId }) {
      commit('SET_SEMESTER_LOADING', semesterId);
      return removeSemester(studentId, semesterId).then(() => {
        commit('REMOVE_SEMESTER', semesterId);
      });
    },
  },
};
