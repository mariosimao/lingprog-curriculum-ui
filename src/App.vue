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
      <v-btn text @click="logout">Logout</v-btn>
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

export default {
  name: 'App',

  data: () => ({
  }),
  methods: {
    logout() {
      firebase.auth().signOut();
    },
  },
};
</script>
