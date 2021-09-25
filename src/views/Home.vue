<template>
  <div>
    <v-row>
      <v-col
        v-for="semester in semesters"
        :key="semester.id"
      >
        <StudentSemester
          :id="semester.id"
          :name="semester.name"
        />
      </v-col>
      <v-col>
        <v-card>
          <v-card-text>
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
                  v-model="startDate"
                  dense
                  placeholder="Start date"
                  prepend-icon="mdi-calendar"
                  readonly
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
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
                  v-model="endDate"
                  dense
                  placeholder="End date"
                  prepend-icon="mdi-calendar"
                  readonly
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                no-title
                @input="endPicker = false"
              ></v-date-picker>
            </v-menu>
            <v-btn @click="addSemester" small class="mt-5">
              Add
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StudentSemester from '../components/StudentSemester.vue';

export default {
  name: 'Home',

  components: {
    StudentSemester,
  },
  data: () => ({
    startDate: null,
    endDate: null,
    startPicker: false,
    endPicker: false,
  }),
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('plannedSemester', ['semesters', 'areSemestersLoaded']),
  },
  methods: {
    ...mapActions('plannedSemester', ['fetchSemesters', 'planSemester']),
    addSemester() {
      this.planSemester({
        studentId: this.user.data.uid,
        startDate: this.startDate,
        endDate: this.endDate,
      }).then(() => {
        this.startDate = null;
        this.endDate = null;
      });
    },
  },
  mounted() {
    if (!this.areSemestersLoaded) {
      this.fetchSemesters(this.user.data.uid);
    }
  },
};
</script>
