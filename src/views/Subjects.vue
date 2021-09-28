<template>
  <v-container>
    <v-row justify="center" align="center" class="mt-2">
      <v-col sm="6" class="d-flex align-center justify-center">
        <v-text-field
          v-model="search"
          filled
          rounded
          placeholder="Search subject..."
          append-icon="mdi-magnify"
          hide-details
        />
        <v-btn
          fab
          medium
          color="primary"
          class="ml-4"
          :disabled="addingSubject"
          @click="addingSubject = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="addingSubject" justify="center" align="center">
      <v-col class="d-flex align-center justify-center">
        <AddSubjectCard
          @cancel="addingSubject = false"
        />
      </v-col>
    </v-row>
    <div class="d-flex flex-wrap justify-center mt-2 pt-3">
      <Subject
        v-for="subject in filteredSubjects"
        class="mx-2"
        :key="subject.id"
        :id="subject.id"
        :code="subject.code"
        :name="subject.name"
        :credits="subject.credits"
      />
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddSubjectCard from '../components/AddSubjectCard.vue';
import Subject from '../components/Subject.vue';

export default {
  name: 'Subjects',

  components: {
    AddSubjectCard,
    Subject,
  },
  data: () => ({
    search: '',
    addingSubject: false,
  }),
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('subject', ['subjects', 'areSubjectsLoaded']),
    filteredSubjects() {
      if (!this.search) {
        return this.subjects;
      }

      return this.subjects.filter((s) => {
        const matchCode = s.code.includes(this.search);
        const matchName = s.name.includes(this.search);

        return matchCode || matchName;
      });
    },
  },
  methods: {
    ...mapActions('subject', ['fetchSubjects']),
  },
  mounted() {
    if (!this.areSubjectsLoaded) {
      this.fetchSubjects();
    }
  },
};
</script>
