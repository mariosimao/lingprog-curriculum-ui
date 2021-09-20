import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from './plugins/firebase';

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('user/updateUser', user);
  if (firebase.auth().currentUser) {
    router.replace({ name: 'home' });
  } else {
    const authRequired = router.currentRoute?.meta?.authRequired;
    if (authRequired) {
      router.replace({ name: 'login' });
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
