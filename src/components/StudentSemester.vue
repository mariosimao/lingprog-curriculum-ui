<template>
  <v-card
    class="my-3"
    min-width="200"
    @mouseover="showSettings = true"
    @mouseleave="showSettings = false"
  >
    <v-card-text>
      <v-fade-transition>
        <div
          v-if="operation === 'view'"
          class="d-flex align-center"
        >
          {{ name }}
          <v-spacer/>
          <v-btn v-if="showSettings" x-small icon>
            <v-icon @click="operation = 'add-subject'">mdi-plus</v-icon>
          </v-btn>
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
              <v-list-item @click="operation = 'edit'">
                <v-list-item-title>
                  <v-icon small left>mdi-pencil</v-icon>
                  Edit
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteSemester">
                <v-list-item-title>
                  <v-icon small left>mdi-delete</v-icon>
                  Delete
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-fade-transition>
      <v-autocomplete
        v-if="operation === 'add-subject'"
        class="pt-2 shrink"
        dense
        hide-details="auto"
        placeholder="Select subject"
      />
      <!-- Edit Start -->
      <v-expand-transition>
        <div v-if="operation === 'edit'">
          <div class="d-flex align-center">
            <v-text-field
              v-model="newName"
              dense
              hide-details
              prepend-icon="mdi-text"
              placeholder="Semester name"
            />
            <v-btn x-small icon>
              <v-icon @click="operation = 'view'">mdi-close</v-icon>
            </v-btn>
            <v-btn small icon color="green">
              <v-icon @click="operation = 'view'">mdi-check</v-icon>
            </v-btn>
          </div>
          <v-menu
            v-model="startPicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="newStart"
                dense
                prepend-icon="mdi-calendar"
                readonly
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="newStart"
              no-title
              @input="startPicker = false"
            ></v-date-picker>
          </v-menu>
          <v-menu
            v-model="endPicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="newEnd"
                dense
                prepend-icon="mdi-calendar"
                hide-details
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="newEnd"
              no-title
              @input="endPicker = false"
            ></v-date-picker>
          </v-menu>
        </div>
      </v-expand-transition>
      <!-- Edit End -->
      <!-- <draggable
        v-model="attempts"
        group="studentSemester"
        @add="moveSubject"
        @start="onDragStart"
        @end="onDragEnd"
        @choose="onDragStart"
        @unchoose="onDragEnd"
      >
        <SubjectAttempt
          v-for="attempt in attempts"
          :key="attempt.id"
          :id="attempt.id"
          :code="attempt.subject.code"
          :name="attempt.subject.name"
          :credits="attempt.subject.credits"
          :professor="attempt.professor"
          :grade="attempt.grade"
        />
      </draggable> -->
    </v-card-text>
  </v-card>
</template>

<script>
// import draggable from 'vuedraggable';
import { mapActions, mapGetters } from 'vuex';
// import SubjectAttempt from './SubjectAttempt.vue';

export default {
  components: { },
  name: 'StudentSemester',
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '2021-01-01',
    },
    endDate: {
      type: String,
      default: '2021-05-31',
    },
  },
  data: () => ({
    showSettings: false,
    operation: 'view',
    newName: '',
    newStart: '',
    newEnd: '',
    startPicker: false,
    endPicker: false,
  }),
  computed: {
    ...mapGetters('user', ['user']),
    attempts: {
      get() {
        return this.$store.getters.semesterAttempts(this.id);
      },
      set(attempts) {
        this.$store.commit('UPDATE_SEMESTER_ATTEMPTS', { semesterId: this.id, attempts });
      },
    },
  },
  methods: {
    ...mapActions(['moveSubjectAttempt']),
    ...mapActions('plannedSemester', [
      'removeSemester',
    ]),
    moveSubject(e) {
      // console.log(e);
      const attemptId = this.attempts[e.newIndex].id;
      const newSemesterId = this.id;
      // console.log(this.attempts[e.newIndex].subject.name);
      // console.log(this.name);
      this.moveSubjectAttempt({ attemptId, newSemesterId });
    },
    onDragStart(e) {
      e.target.classList.add('grabbing');
    },
    onDragEnd(e) {
      e.target.classList.remove('grabbing');
    },
    deleteSemester() {
      this.removeSemester({
        studentId: this.user.data.uid,
        semesterId: this.id,
      });
    },
  },
  created() {
    this.newName = this.name;
    this.newStart = this.startDate;
    this.newEnd = this.endDate;
  },
};
</script>

<style>
.grabbing * {
  cursor: grabbing !important;
};
</style>
