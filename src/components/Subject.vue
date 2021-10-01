<template>
  <v-card
    class="my-3"
    :color="cardColor"
    :loading="isSubjectLoading(id) ? 'primary' : false"
    :disabled="isSubjectLoading(id)"
    min-width="150"
    max-width="150"
  >
    <v-card-text class="pa-3">
      <div class="d-flex">
        <div class="text-caption my-0">{{ code }} • {{ credits }}&nbsp;</div>
        <v-spacer/>
        <v-menu
          bottom
          left
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              x-small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="remove">
              <v-list-item-title>
                <v-icon small left>mdi-delete</v-icon>
                Delete
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <p class="font-weight-bold text-body-1 my-0 text-truncate">
        {{ name }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  }),
  computed: {
    ...mapGetters('subject', ['isSubjectLoading']),
    cardColor() {
      return subjectColor(this.code);
    },
  },
  methods: {
    ...mapActions('subject', ['removeSubject']),
    remove() {
      this.removeSubject({ subjectId: this.id });
    },
  },
};
</script>
