<template>
  <v-card
    class="my-3"
    :color="cardColor"
    min-width="150"
    max-width="150"
    @mouseover="showSettings = true"
    @mouseleave="showSettings = false"
  >
    <v-card-text class="pa-3">
      <div class="d-flex">
        <div class="text-caption my-0">{{ code }} • {{ credits }}&nbsp;</div>
        <v-spacer/>
        <v-btn v-if="showSettings" x-small icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
      <p class="font-weight-bold text-body-1 my-0 text-truncate">
        {{ name }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import subjectColor from '../services/subject-color';

export default {
  name: 'Subject',
  props: {
    id: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    credits: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    showSettings: false,
  }),
  computed: {
    cardColor() {
      return subjectColor(this.code);
    },
  },
  methods: {
  },
};
</script>
