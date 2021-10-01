<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col class="d-flex flex-column justify-center align-center">
        <v-card width="450">
          <v-card-text class="pt-8 px-8 pb-3">
            <h1 class="text-center pb-6">🎓 My Curriculum</h1>
            <p>Register and start planning your semester.</p>
            <form @submit.prevent="register">
              <v-text-field
                v-model="name"
                :class="error.name ? 'pb-0' : 'pb-3'"
                :error-messages="error.name"
                outlined
                label="Name"
                hide-details="auto"
              />
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
                :loading="loadingRegister"
                type="submit"
                color="blue"
                block
                dark
              >
                Register
              </v-btn>
            </form>
            <p class="pt-2 mb-0 red--text">
              {{ error.generic }}
            </p>
            <p class="pt-6 text-center">
              Already have an account?
              <router-link :to="{ name: 'login' }">Sign in instead</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'Register',
  components: {},
  data: () => ({
    name: '',
    email: '',
    password: '',
    showPassword: false,
    loadingRegister: false,
    error: {
      name: '',
      email: '',
      password: '',
      generic: '',
    },
  }),
  computed: {
  },
  methods: {
    register() {
      this.error = {};
      this.loadingRegister = true;
      if (!this.name) {
        this.error = { name: 'Name is required' };
        this.loadingRegister = false;
        return;
      }

      firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.updateProfile({ displayName: this.name });
          return data.user;
        })
        .then((user) => {
          this.$store.dispatch('user/registerUser', user.uid);
          return user;
        })
        .then(() => {
          this.$store.dispatch('user/updateUser', firebase.auth.currentUser);
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.error = { email: 'Invalid email.' };
              break;
            case 'auth/email-already-in-use':
              this.error = { email: 'This email is already in use by another account.' };
              break;
            case 'auth/weak-password':
              this.error = { password: 'The password must be 6 characters long or more.' };
              break;
            default:
              this.error = { generic: error.message };
          }
        })
        .finally(() => { this.loadingRegister = false; });
    },
  },
};
</script>
