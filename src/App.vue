<template>
  <v-app>
    <v-app-bar
      app
      dense
      flat
      dark
      color="primary"
    >
      <v-btn text :to="{ name: 'home' }" class="ma-2">My Curriculum</v-btn>
      <v-btn text :to="{ name: 'subjects' }">Subjects</v-btn>
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
      <notifications class="ma-3" position="top right">
        <template slot="body" slot-scope="{ item }">
          <v-alert
            type="error"
            border="left"
            dense
            outlined
          >
            {{ item.text }}
          </v-alert>
        </template>
      </notifications>
      <router-view/>
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

<style>
html {
  overflow-y: auto !important;
}
</style>
