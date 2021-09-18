import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from './plugins/firebase';

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('user/updateUser', user);
  const routeName = firebase.auth().currentUser ? 'home' : 'login';
  router.replace({ name: routeName });
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
