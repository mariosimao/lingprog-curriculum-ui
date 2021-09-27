<template>
  <v-container fluid class="d-flex semesters align-start">
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
      v-if="!addingSemester"
      class="mx-2"
      @click="addingSemester = true"
    />
    <AddSemesterCard
      v-if="addingSemester"
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
    ...mapGetters('plannedSemester', ['semesters', 'areSemestersLoaded']),
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
