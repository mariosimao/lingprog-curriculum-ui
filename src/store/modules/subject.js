import {
  createSubject,
  deleteSubject,
  getSubjects,
} from '../../api/subject';

export default {
  namespaced: true,
  state: {
    subjects: [],
    subjectsStatus: 'pending',
    subjectStatus: {}, // Status per subject
  },
  getters: {
    subjects(state) {
      return state.subjects;
    },
    subject: (state) => (subjectId) => (state.subjects.find((s) => s.id === subjectId)),
    isSubjectLoading: (state) => (subjectId) => (state.subjectStatus[subjectId] === 'loading'),
    areSubjectsLoaded(state) {
      return state.subjectsStatus === 'loaded';
    },
  },
  mutations: {
    SET_SUBJECTS(state, subjects) {
      state.subjects = subjects;
    },
    ADD_SUBJECT(state, subject) {
      const subjects = [
        ...state.subjects,
        subject,
      ];

      state.subjects = subjects;
    },
    REMOVE_SUBJECT(state, subjectId) {
      state.subjects = state.subjects.filter((s) => (s.id !== subjectId));

      const status = { ...state.subjectStatus };
      delete status[subjectId];
      state.subjectStatus = status;
    },
    UPDATE_SUBJECT(state, subject) {
      const index = state.subjects.findIndex((s) => (s.id === subject.id));

      const subjects = [...state.subjects];
      subjects[index] = subject;

      state.subjects = subjects;
    },
    RESET_SUBJECTS_STATUS(state) {
      const subjectStatus = {};
      state.subjects.forEach((subject) => {
        subjectStatus[subject.id] = 'loaded';
      });

      state.subjectStatus = subjectStatus;
    },
    SET_SUBJECT_LOADING(state, subjectId) {
      state.subjectStatus = {
        ...state.subjectStatus,
        [subjectId]: 'loading',
      };
    },
    SET_SUBJECT_LOADED(state, subjectId) {
      state.subjectStatus = {
        ...state.subjectStatus,
        [subjectId]: 'loaded',
      };
    },
    SET_SUBJECTS_STATUS(state, status) {
      state.subjectStatus = status;
    },
  },
  actions: {
    fetchSubjects({ commit }, studentId) {
      commit('SET_SUBJECTS_STATUS', 'loading');
      getSubjects(studentId).then((subjects) => {
        commit('SET_SUBJECTS', subjects);
        commit('SET_SUBJECTS_STATUS', 'loaded');
      }).catch(() => {
        commit('SET_SUBJECTS_STATUS', 'error');
      });
    },
    addSubject({ commit }, { code, name, credits }) {
      return createSubject(code, name, credits).then((id) => {
        const subject = {
          id, code, name, credits,
        };

        commit('ADD_SUBJECT', subject);
        commit('SET_SUBJECT_LOADED', id);

        return id;
      });
    },
    removeSubject({ commit }, { subjectId }) {
      commit('SET_SUBJECT_LOADING', subjectId);

      return deleteSubject(subjectId).then(() => {
        commit('REMOVE_SUBJECT', subjectId);
      });
    },
    // planSubject({ commit }, { studentId, startDate, endDate }) {
    //   return createSubject(studentId, startDate, endDate).then((subject) => {
    //     commit('SET_SUBJECT_LOADED', subject.id);
    //     commit('ADD_SUBJECT', subject);
    //   });
    // },
    // updateSubject({ commit }, { studentId, subject }) {
    //   commit('SET_SUBJECT_LOADING', subject.id);
    //   return updateSubject(
    //     studentId,
    //     subject.id,
    //     subject.name,
    //     subject.startDate,
    //     subject.endDate,
    //   ).then(() => {
    //     commit('UPDATE_SUBJECT', subject);
    //     commit('SET_SUBJECT_LOADED', subject.id);
    //   }).catch((e) => {
    //     commit('SET_SUBJECT_LOADED', subject.id);
    //     throw e;
    //   });
    // },
    // removeSubject({ commit }, { studentId, subjectId }) {
    //   commit('SET_SUBJECT_LOADING', subjectId);
    //   return removeSubject(studentId, subjectId).then(() => {
    //     commit('REMOVE_SUBJECT', subjectId);
    //   });
    // },
  },
};
