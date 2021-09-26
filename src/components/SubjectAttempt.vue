<template>
  <v-card
    :disabled="isAttemptLoading(id)"
    :loading="isAttemptLoading(id)"
    :class="cardClasses"
    :color="cardColor"
    @mouseover="showSettings = true"
    @mouseleave="showSettings = false"
  >
    <template slot="progress">
      <v-progress-linear
        height="4"
        indeterminate
      />
    </template>
    <v-card-text class="pa-3 pr-1">
      <div class="d-flex">
        <div class="text-caption my-0">
          {{ subject(subjectId).code }} • {{ subject(subjectId).credits }}&nbsp;
        </div>
        <div
          v-if="grade"
          class="text-caption my-0 ">
          • <span :class="`${gradeColor}--text text--darken-3`">{{ grade }}</span>
        </div>
        <v-spacer/>
        <v-btn v-if="showSettings" x-small icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
      <p class="font-weight-bold text-body-1 my-0">
        {{ subject(subjectId).name }}
      </p>
      <p class="text-caption mb-0">
        {{ professor }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SubjectAttempt',
  props: {
    id: {
      type: String,
      default: '',
    },
    subjectId: {
      type: String,
      default: '',
    },
    professor: {
      type: String,
      default: null,
    },
    grade: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    showSettings: false,
    cardClasses: ['my-3', 'attempt-card'],
  }),
  computed: {
    ...mapGetters(['isAttemptLoading']),
    ...mapGetters('subject', ['subject']),
    gradeColor() {
      if (this.grade >= 5) {
        return 'green';
      }

      return 'red';
    },
    cardColor() {
      const colors = [
        '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB',
        '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3',
        '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#CFD8DC',
        // Escuro demais (lighten 3)
        // '#FFCDD2', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9',
        // '#81D4FA', '#80DEEA', '#80CBC4', '#A5D6A7', '#C5E1A5', '#E6EE9C',
        // '#FFF59D', '#FFE082', '#FFCC80', '#FFAB91', '#BCAAA4', '#B0BEC5',
      ];

      let hash = 0;
      const { code } = this.subject(this.subjectId);
      if (code.length === 0) {
        return colors[hash];
      }
      for (let i = 0; i < code.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        hash = code.charCodeAt(i) + ((hash << 5) - hash);
        // eslint-disable-next-line no-bitwise
        hash &= hash;
      }
      hash = ((hash % colors.length) + colors.length) % colors.length;
      return colors[hash];
    },
  },
  methods: {
  },
};
</script>

<style>
.attempt-card {
  cursor: grab;
};
</style>
