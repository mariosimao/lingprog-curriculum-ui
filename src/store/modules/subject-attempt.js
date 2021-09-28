import * as api from '../../api/subject-attempt';

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
    UPDATE_SEMESTER_ATTEMPT(state, { semesterId, attempt }) {
      const attempts = [...state.attempts[semesterId]];
      const index = attempts.findIndex((a) => a.id === attempt.id);
      attempts[index] = attempt;

      state.attempts = {
        ...state.attempts,
        [semesterId]: attempts,
      };
    },
    REMOVE_SEMESTER_ATTEMPT(state, { semesterId, attemptId }) {
      const attempts = state.attempts[semesterId].filter((attempt) => (attempt.id !== attemptId));

      state.attempts = {
        ...state.attempts,
        [semesterId]: attempts,
      };
    },
  },
  actions: {
    fetchSemesterAttempts({ commit }, { studentId, semesterId }) {
      return api.getSemesterAttempts(studentId, semesterId).then((attempts) => {
        commit('SET_SEMESTER_ATTEMPTS', { semesterId, attempts });

        return attempts;
      });
    },
    addSubjectAttempt({ commit }, { studentId, semesterId, subjectId }) {
      return api.addAttempt(studentId, semesterId, subjectId).then((id) => {
        const attempt = {
          id,
          subjectId,
          grade: null,
          professor: null,
        };
        commit('ADD_SEMESTER_ATTEMPT', { semesterId, attempt });
      });
    },
    updateSubjectAttempt({ commit, getters }, {
      studentId,
      semesterId,
      attemptId,
      newGrade,
      newProfessor,
    }) {
      return api.updateAttempt(
        studentId, semesterId, attemptId, newGrade, newProfessor, semesterId,
      ).then(() => {
        const attempt = getters.semesterAttempts(semesterId).find((a) => a.id === attemptId);
        attempt.professor = newProfessor;
        attempt.grade = newGrade;

        commit('UPDATE_SEMESTER_ATTEMPT', { semesterId, attempt });
      });
    },
    removeSubjectAttempt({ commit }, { studentId, semesterId, attemptId }) {
      return api.removeAttempt(studentId, semesterId, attemptId).then(() => {
        commit('REMOVE_SEMESTER_ATTEMPT', { semesterId, attemptId });
      });
    },
    moveSubjectAttempt({ state, commit }, {
      studentId,
      attemptId,
      oldSemesterId,
      newSemesterId,
    }) {
      const attempt = state.attempts[newSemesterId].find((a) => a.id === attemptId);

      return api.updateAttempt(
        studentId, oldSemesterId, attemptId, attempt.grade, attempt.professor, newSemesterId,
      ).catch((e) => {
        // eslint-disable-next-line no-underscore-dangle
        this._vm.$notify({
          text: e.response.data.error.message,
        });

        commit('REMOVE_SEMESTER_ATTEMPT', { semesterId: newSemesterId, attemptId });
        commit('ADD_SEMESTER_ATTEMPT', { semesterId: oldSemesterId, attempt });
      });
    },
  },
};
