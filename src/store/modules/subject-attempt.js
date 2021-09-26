import { getSemesterAttempts, addAttempt } from '../../api/subject-attempt';

export default {
  namespaced: true,
  state: {
    attempts: {},
  },
  getters: {
    semesterAttempts: (state) => (semesterId) => (state.attempts[semesterId]),
    areSemesterAttemptsLoaded: (state) => (semesterId) => (semesterId in state.attempts),
  },
  mutations: {
    SET_SEMESTER_ATTEMPTS(state, { semesterId, attempts }) {
      const semestersAttempts = {
        ...state.attempts,
        [semesterId]: attempts,
      };

      state.attempts = semestersAttempts;
    },
    ADD_SEMESTER_ATTEMPT(state, { semesterId, attempt }) {
      const attempts = {
        ...state.attempts,
        [semesterId]: [...state.attempts[semesterId], attempt],
      };

      state.attempts = attempts;
    },
  },
  actions: {
    fetchSemesterAttempts({ commit }, { studentId, semesterId }) {
      return getSemesterAttempts(studentId, semesterId).then((attempts) => {
        commit('SET_SEMESTER_ATTEMPTS', { semesterId, attempts });

        return attempts;
      });
    },
    addSubjectAttempt({ commit }, { studentId, semesterId, subjectId }) {
      return addAttempt(studentId, semesterId, subjectId).then((id) => {
        const attempt = {
          id,
          subjectId,
          grade: null,
          professor: null,
        };
        commit('ADD_SEMESTER_ATTEMPT', { semesterId, attempt });
      });
    },
  },
};
