<template>
  <v-container fluid class="d-flex semesters align-start">
    <v-row
      v-if="areSemestersLoading"
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col cols="12" class="text-center">
        Fetching semesters...
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          indeterminate
          rounded
          height="6"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="areSemestersLoaded && semesters.length === 0"
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        v-if="!addingSemester"
        cols="12"
        class="text-center"
      >
        <p class="text-h5 grey--text text--darken-1 mb-0">
          <v-icon x-large>mdi-ghost-outline</v-icon>
          No semester has been registered yet
        </p>
      </v-col>
      <v-col
        v-if="!addingSemester"
        cols="12"
        class="d-flex justify-center"
      >
        <v-btn
          color="primary"
          @click="addingSemester = true"
        >
          Plan semester
        </v-btn>
      </v-col>
      <v-col
        v-if="addingSemester"
        cols="12"
        class="d-flex justify-center"
      >
        <AddSemesterCard
          class="mx-2"
          @add="addingSemester = false"
          @cancel="addingSemester = false"
        />
      </v-col>
    </v-row>
    <StudentSemester
      v-for="semester in semesters"
      :key="semester.id"
      :id="semester.id"
      :name="semester.name"
      :start-date="semester.startDate"
      :end-date="semester.endDate"
      class="mx-2"
    />
    <AddSemesterButton
      v-if="!areSemestersLoading && !addingSemester && semesters.length > 0"
      class="mx-2"
      @click="addingSemester = true"
    />
    <AddSemesterCard
      v-if="!areSemestersLoading && addingSemester && semesters.length > 0"
      class="mx-2"
      @add="addingSemester = false"
      @cancel="addingSemester = false"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddSemesterButton from '../components/AddSemesterButton.vue';
import AddSemesterCard from '../components/AddSemesterCard.vue';
import StudentSemester from '../components/StudentSemester.vue';

export default {
  name: 'Home',
  components: {
    AddSemesterButton,
    AddSemesterCard,
    StudentSemester,
  },
  data: () => ({
    addingSemester: false,
  }),
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('plannedSemester', [
      'semesters',
      'areSemestersLoaded',
      'areSemestersLoading',
    ]),
    ...mapGetters('subject', ['areSubjectsLoaded']),
  },
  methods: {
    ...mapActions('plannedSemester', ['fetchSemesters']),
    ...mapActions('subject', ['fetchSubjects']),
  },
  mounted() {
    if (!this.areSemestersLoaded) {
      this.fetchSemesters(this.user.data.uid);
    }

    if (!this.areSubjectsLoaded) {
      this.fetchSubjects();
    }
  },
};
</script>

<style scoped>
.semesters {
  overflow-x: auto;
  height: 100%;
}
</style>
