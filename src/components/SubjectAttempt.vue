<template>
  <v-card
    :id="id"
    :class="cardClasses"
    :color="cardColor"
    :loading="isAttemptLoading(id) ? 'primary' : false"
    :disabled="isAttemptLoading(id)"
    @mouseover="showSettings = true"
    @mouseleave="showSettings = false"
  >
    <v-card-text v-if="operation === 'view'" class="pa-3">
      <div class="d-flex">
        <div class="text-caption my-0">
          {{ subject(subjectId).code }} • {{ subject(subjectId).credits }}&nbsp;
        </div>
        <div
          v-if="grade"
          class="text-caption my-0 ">
          • <span :class="`${gradeColor}--text text--darken-3`">{{ grade.toFixed(2) }}</span>
        </div>
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
            <v-list-item @click="startEdit">
              <v-list-item-title>
                <v-icon small left>mdi-pencil</v-icon>
                Edit
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="remove">
              <v-list-item-title>
                <v-icon small left>mdi-delete</v-icon>
                Delete
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <p class="font-weight-bold text-body-1 my-0">
        {{ subject(subjectId).name }}
      </p>
      <p class="text-caption mb-0">
        {{ professor }}
      </p>
    </v-card-text>
    <v-card-text v-else-if="operation === 'edit'" class="pa-3">
      <div v-if="operation === 'edit'" class="d-flex align-center flex-wrap">
        <div class="text-caption my-0">
          {{ subject(subjectId).code }} • {{ subject(subjectId).credits }}
        </div>
        <v-spacer/>
        <v-btn icon x-small @click="cancelEdit">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn icon x-small color="success" @click="saveEdit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </div>
      <p class="font-weight-bold text-body-1 my-0">
        {{ subject(subjectId).name }}
      </p>
      <v-text-field
        class="mb-1"
        v-model="newGrade"
        type="number"
        step="0.1"
        solo
        dense
        hide-details
        placeholder="Grade"
        height="5"
      />
      <v-text-field
        v-model="newProfessor"
        solo
        dense
        hide-details
        placeholder="Professor"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import subjectColor from '../services/subject-color';

export default {
  name: 'SubjectAttempt',
  props: {
    id: {
      type: String,
      default: '',
    },
    semesterId: {
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
    operation: 'view',
    newProfessor: null,
    newGrade: null,
    showSettings: false,
    cardClasses: ['my-3', 'attempt-card'],
  }),
  computed: {
    ...mapGetters('user', ['userId']),
    ...mapGetters('subject', ['subject']),
    ...mapGetters('subjectAttempt', ['isAttemptLoading']),
    gradeColor() {
      if (this.grade >= 5) {
        return 'green';
      }

      return 'red';
    },
    cardColor() {
      const { code } = this.subject(this.subjectId);

      return subjectColor(code);
    },
  },
  methods: {
    ...mapActions('subjectAttempt', ['removeSubjectAttempt', 'updateSubjectAttempt']),
    startEdit() {
      this.operation = 'edit';
      this.newProfessor = this.professor;
      this.newGrade = this.grade?.toFixed(2);
    },
    cancelEdit() {
      this.operation = 'view';
    },
    saveEdit() {
      this.updateSubjectAttempt({
        studentId: this.userId,
        semesterId: this.semesterId,
        attemptId: this.id,
        newProfessor: this.newProfessor,
        newGrade: parseFloat(this.newGrade),
      }).then(() => { this.operation = 'view'; });
    },
    remove() {
      this.removeSubjectAttempt({
        studentId: this.userId,
        semesterId: this.semesterId,
        attemptId: this.id,
      });
    },
  },
};
</script>
