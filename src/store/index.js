import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import plannedSemester from './modules/planned-semester';
import subject from './modules/subject';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    studentSemesters: [],
    studentSemestersStatus: 'not loaded',
    attemptsStatus: {},
  },
  getters: {
    getStudentSemesters(state) {
      return state.studentSemesters;
    },
    semestersLoaded(state) {
      return state.studentSemestersStatus === 'loaded';
    },
    isAttemptLoading: (state) => (attemptId) => (state.attemptsStatus[attemptId] === 'loading'),
    semesterAttempts: (state) => (semesterId) => (state.studentSemesters.find(
      (semester) => semester.id === semesterId,
    ).attempts),
  },
  mutations: {
    UPDATE_STUDENT_SEMESTERS(state, semesters) {
      state.studentSemesters = semesters;
    },
    UPDATE_STUDENT_SEMESTER_STATUS(state, status) {
      state.studentSemestersStatus = status;
    },
    UPDATE_ATTEMPT_STATUS(state, { attemptId, status }) {
      state.attemptsStatus = {
        ...state.attemptsStatus,
        [attemptId]: status,
      };
    },
    UPDATE_SEMESTER_ATTEMPTS(state, { semesterId, attempts }) {
      const index = state.studentSemesters.findIndex((s) => s.id === semesterId);

      state.studentSemesters[index].attempts = attempts;
    },
  },
  actions: {
    fetchStudentSemesters({ commit }) {
      const wait = (ms) => new Promise((resolve) => {
        // TODO: call API
        setTimeout(resolve, ms);
      });

      wait(1000).then(() => {
        const semesters = [
          {
            id: '1',
            name: '2016.2',
            attempts: [
              {
                id: '1',
                subject: { code: 'EEL-170', name: 'Computação I', credits: 5 },
                professor: 'AC',
                grade: 8.2,
              },
              {
                id: '2',
                subject: { code: 'MAC-118', name: 'Calculo I', credits: 6 },
                professor: 'Helena Judith',
                grade: 4.5,
              },
              {
                id: '3',
                subject: { code: 'FIS-111', name: 'FisExp I', credits: 1 },
                professor: 'Yara do Amaral',
                grade: 6.2,
              },
              {
                id: '4',
                subject: { code: 'FIT-112', name: 'Fisica I', credits: 4 },
                professor: 'Joaquim',
                grade: 8.7,
              },
              {
                id: '5',
                subject: { code: 'EEI-206', name: 'HisTec', credits: 2 },
                professor: 'Celso',
                grade: 10,
              },
            ],
          },
          {
            id: '2',
            name: '2017.1',
            attempts: [
              {
                id: '6',
                subject: { code: 'EEL-280', name: 'Circ. Logicos', credits: 5 },
                professor: 'Jose Arthur',
                grade: 5,
              },
              {
                id: '7',
                subject: { code: 'EEL-270', name: 'Computacao II', credits: 5 },
                professor: 'Marcelo Lanza',
                grade: 6.1,
              },
              {
                id: '8',
                subject: { code: 'MAC-118', name: 'Calculo I', credits: 6 },
                professor: 'Flavio Dickstein',
                grade: 7.9,
              },
              {
                id: '9',
                subject: { code: 'EEH-210', name: 'EMA', credits: 2 },
                professor: 'Ricardo Musafir',
                grade: 6.9,
              },
              {
                id: '10',
                subject: { code: 'MAE-125', name: 'AlgeLin', credits: 4 },
                professor: 'Marcello Campos',
                grade: 6.4,
              },
            ],
          },
          {
            id: '3',
            name: '2017.2',
            attempts: [
              {
                id: '11',
                subject: { code: 'MAC-128', name: 'Calculo II', credits: 4 },
                professor: 'Wilton Arruda',
                grade: 7.6,
              },
              {
                id: '12',
                subject: { code: 'EEL-315', name: 'Eletronica I', credits: 3 },
                professor: 'Marcio Nogueira',
                grade: 6.4,
              },
              {
                id: '13',
                subject: { code: 'FIS-121', name: 'FisExp II', credits: 1 },
                professor: 'Alexis',
                grade: 5.6,
              },
              {
                id: '14',
                subject: { code: 'FIT-122', name: 'Fisica II', credits: 4 },
                professor: 'Marcela Campista',
                grade: 6.6,
              },
              {
                id: '15',
                subject: { code: 'IQG-111', name: 'Quimica', credits: 4 },
                professor: 'Emerson',
                grade: 8.0,
              },
              {
                id: '16',
                subject: { code: 'EEG-105', name: 'SisProj', credits: 4 },
                professor: 'Gisele Barboa',
                grade: 9.0,
              },
              {
                id: '17',
                subject: { code: 'EEW-215', name: 'Topicos HistEng', credits: 2 },
                professor: 'Mercio',
                grade: 10,
              },
            ],
          },
        ];
        commit('UPDATE_STUDENT_SEMESTERS', semesters);
        commit('UPDATE_STUDENT_SEMESTER_STATUS', 'loaded');
        semesters.reduce((previous, semester) => {
          previous.push(...semester.attempts);
          return previous;
        }, []).forEach((a) => {
          commit('UPDATE_ATTEMPT_STATUS', { attemptId: a.id, status: 'loaded' });
        });
      });
    },
    moveSubjectAttempt({ commit }, { attemptId }) {
      const wait = (ms) => new Promise((resolve) => {
        setTimeout(resolve, ms);
      });

      commit('UPDATE_ATTEMPT_STATUS', { attemptId, status: 'loading' });
      wait(1000).then(() => {
        commit('UPDATE_STUDENT_SEMESTER_STATUS', 'loaded');
        // TODO: call API
        if (attemptId === 'a') {
          throw Error('It was not possible to move subject across semesters.');
        }
        commit('UPDATE_ATTEMPT_STATUS', { attemptId, status: 'loaded' });
      }).catch((error) => {
        // eslint-disable-next-line no-underscore-dangle
        this._vm.$notify({ type: 'error', text: error.message });
        commit('UPDATE_ATTEMPT_STATUS', { attemptId, status: 'error' });
      });
    },
  },
  modules: {
    user,
    plannedSemester,
    subject,
  },
});
