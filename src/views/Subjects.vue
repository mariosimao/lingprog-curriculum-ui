<template>
  <div class="d-flex flex-wrap">
    <Subject
      v-for="subject in subjects"
      class="ma-2"
      :key="subject.id"
      :id="subject.id"
      :code="subject.code"
      :name="subject.name"
      :credits="subject.credits"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Subject from '../components/Subject.vue';

export default {
  name: 'Subjects',

  components: {
    Subject,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('subject', ['subjects', 'areSubjectsLoaded']),
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
