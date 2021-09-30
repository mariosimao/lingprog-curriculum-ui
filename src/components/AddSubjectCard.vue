<template>
  <v-card max-width="250" color="grey lighten-2">
    <v-card-text>
      <v-text-field
        v-model="name"
        class="mb-3"
        solo
        dense
        hide-details
        placeholder="Name"
      />
      <v-row>
        <v-col>
          <v-text-field
            v-model="code"
            solo
            dense
            hide-details
            placeholder="Code"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="credits"
            solo
            dense
            hide-details
            placeholder="Credits"
            type="number"
            step="1"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="pa-4 pt-0">
      <v-spacer />
      <v-btn text small @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-btn color="primary" small @click="add">
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddSubjectCard',
  data: () => ({
    name: null,
    code: null,
    credits: null,
  }),
  methods: {
    ...mapActions('subject', ['addSubject']),
    add() {
      this.addSubject({
        code: this.code,
        name: this.name,
        credits: parseInt(this.credits, 10),
      }).then(() => { this.$emit('add'); });
    },
  },
};
</script>
