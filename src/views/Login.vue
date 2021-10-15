<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col class="d-flex flex-column justify-center align-center">
        <v-card width="450">
          <v-card-text class="pt-8 px-8 pb-3">
            <h1 class="text-center pb-6">🎓 My study plan</h1>
            <p>Sign in and start planning your semester.</p>
            <form @submit.prevent="login">
              <v-text-field
                v-model="email"
                :class="error.email ? 'pb-0' : 'pb-3'"
                :error-messages="error.email"
                outlined
                label="Email"
                hide-details="auto"
              />
              <v-text-field
                v-model="password"
                :class="error.password ? 'pb-0' : 'pb-3'"
                :error-messages="error.password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                outlined
                label="Password"
                hide-details="auto"
                @click:append="showPassword = !showPassword"
              />
              <v-btn
                :loading="loadingLogin"
                type="submit"
                color="blue"
                block
                dark
              >
                Login
              </v-btn>
            </form>
            <p class="pt-2 mb-0 red--text">
              {{ error.generic }}
            </p>
            <p class="pt-6 text-center">
              Don't have an account?
              <router-link :to="{ name: 'register' }">Register</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  components: {},
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    error: {
      generic: '',
      email: '',
      password: '',
    },
    loadingLogin: false,
  }),
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    login() {
      this.error = {};
      this.loadingLogin = true;
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.error = {
                ...this.error,
                email: 'Invalid email.',
              };
              break;
            case 'auth/wrong-password':
            case 'auth/user-not-found':
              this.error = {
                ...this.error,
                password: 'Invalid email and password combination.',
              };
              break;
            default:
              this.error = {
                ...this.error,
                generic: error.message,
              };
              break;
          }
        })
        .finally(() => { this.loadingLogin = false; });
    },
  },
};
</script>
