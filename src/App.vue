<template>
  <v-app>
    <v-app-bar
      app
      dense
      flat
      dark
      color="primary"
      class="px-2"
    >
      <v-tabs
        optional
      >
        <v-tab
          dark
          :to="{ name: 'home' }"
          :ripple="false"
          min-width="96"
          text
        >
          My Curriculum
        </v-tab>
        <v-tab
          dark
          :to="{ name: 'subjects' }"
          :ripple="false"
          min-width="96"
          text
        >
          Subjects
        </v-tab>
      </v-tabs>
      <v-spacer/>
      <v-menu
        v-if="user.loggedIn"
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            color="white"
            size="30"
            v-bind="attrs"
            v-on="on"
          >
            <span class="primary--text">M</span>
          </v-avatar>
        </template>
        <v-card>
          <v-card-text class="pa-0 pt-4 text-center">
            <h3>{{ user.data.displayName }}</h3>
            <p class="text-caption mt-1">
              {{ user.data.email }}
            </p>
            <v-divider />
            <v-list dense>
              <v-list-item @click="logout">Logout</v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
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
