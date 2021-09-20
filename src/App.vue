<template>
  <v-app>
    <v-app-bar
      app
      dense
      flat
      dark
      color="primary"
    >
      My Curriculum
      <v-spacer/>
      <div v-if="user.data">
        {{ user.data.displayName }} ({{ user.data.email }})
      </div>
      <v-btn
        v-if="user.loggedIn"
        text
        @click="logout"
      >
        Logout
      </v-btn>
    </v-app-bar>
    <v-main class="blue-grey lighten-5">
      <v-container fill-height fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data: () => ({
  }),
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
  },
};
</script>
