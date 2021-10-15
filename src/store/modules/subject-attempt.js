import * as api from '../../api/subject-attempt';

export default {
  namespaced: true,
  state: {
    attempts: {},
    attemptStatus: {},
  },
  getters: {
    semesterAttempts: (state) => (semesterId) => (state.attempts[semesterId]),
    areSemesterAttemptsLoaded: (state) => (semesterId) => (semesterId in state.attempts),
    isAttemptLoading: (state) => (attemptId) => (state.attemptStatus[attemptId] === 'loading'),
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

      const statuses = { ...state.attemptStatus };
      delete statuses[attemptId];

      state.attemptStatus = statuses;
    },
    SET_ATTEMPT_STATUS(state, { attemptId, status }) {
      state.attemptStatus = {
        ...state.attemptStatus,
        [attemptId]: status,
      };
    },
  },
  actions: {
    fetchSemesterAttempts({ commit }, { studentId, semesterId }) {
      return api.getSemesterAttempts(studentId, semesterId).then((attempts) => {
        commit('SET_SEMESTER_ATTEMPTS', { semesterId, attempts });

        attempts.forEach((a) => {
          commit('SET_ATTEMPT_STATUS', { attemptId: a.id, status: 'loaded' });
        });

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
        commit('SET_ATTEMPT_STATUS', { attemptId: id, status: 'loaded' });
      }).catch((e) => {
        // eslint-disable-next-line no-underscore-dangle
        this._vm.$notify({
          text: e.response.data.error.message,
        });
      });
    },
    updateSubjectAttempt({ commit, getters }, {
      studentId,
      semesterId,
      attemptId,
      newGrade,
      newProfessor,
    }) {
      commit('SET_ATTEMPT_STATUS', { attemptId, status: 'loading' });

      return api.updateAttempt(
        studentId, semesterId, attemptId, newGrade, newProfessor, semesterId,
      ).then(() => {
        const attempt = getters.semesterAttempts(semesterId).find((a) => a.id === attemptId);
        attempt.professor = newProfessor;
        attempt.grade = newGrade;

        commit('UPDATE_SEMESTER_ATTEMPT', { semesterId, attempt });
        commit('SET_ATTEMPT_STATUS', { attemptId, status: 'loaded' });
      });
    },
    removeSubjectAttempt({ commit }, { studentId, semesterId, attemptId }) {
      commit('SET_ATTEMPT_STATUS', { attemptId, status: 'loading' });

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
      commit('SET_ATTEMPT_STATUS', { attemptId, status: 'loading' });

      const attempt = state.attempts[newSemesterId].find((a) => a.id === attemptId);

      return api.updateAttempt(
        studentId, oldSemesterId, attemptId, attempt.grade, attempt.professor, newSemesterId,
      ).then(() => {
        commit('SET_ATTEMPT_STATUS', { attemptId, status: 'loaded' });
      }).catch((e) => {
        // eslint-disable-next-line no-underscore-dangle
        this._vm.$notify({
          text: e.response.data.error.message,
        });

        commit('REMOVE_SEMESTER_ATTEMPT', { semesterId: newSemesterId, attemptId });
        commit('ADD_SEMESTER_ATTEMPT', { semesterId: oldSemesterId, attempt });
        commit('SET_ATTEMPT_STATUS', { attemptId, status: 'error' });
      });
    },
  },
};
