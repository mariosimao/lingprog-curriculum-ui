<template>
  <v-card min-width="200" max-width="200">
    <v-card-text>
      <v-menu
        v-model="startPicker"
        :close-on-content-click="false"
        :nudge-left="120"
        transition="slide-y-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="startDate"
            outlined
            dense
            placeholder="Start date"
            prepend-inner-icon="mdi-calendar"
            readonly
            hide-details
            :disabled="loading"
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
        :nudge-left="120"
        transition="slide-y-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="endDate"
            class="mt-2"
            outlined
            dense
            placeholder="End date"
            prepend-inner-icon="mdi-calendar"
            readonly
            hide-details
            :disabled="loading"
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
    </v-card-text>
    <v-card-actions class="pa-4 pt-0">
      <v-spacer />
      <v-btn
        text
        small
        :disabled="loading"
        @click="cancel"
      >
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        small
        :loading="loading"
        @click="addSemester"
      >
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddSemesterCard',
  props: {},
  data: () => ({
    startDate: null,
    endDate: null,
    startPicker: false,
    endPicker: false,
    loading: false,
  }),
  computed: {
    ...mapGetters('user', ['userId']),
  },
  methods: {
    ...mapActions('plannedSemester', ['planSemester']),
    addSemester() {
      this.loading = true;

      this.planSemester({
        studentId: this.userId,
        startDate: this.startDate,
        endDate: this.endDate,
      }).then(() => {
        this.startDate = null;
        this.endDate = null;
        this.loading = false;
        this.$emit('add');
      });
    },
    cancel() {
      this.startDate = null;
      this.endDate = null;
      this.$emit('cancel');
    },
  },
};
</script>
