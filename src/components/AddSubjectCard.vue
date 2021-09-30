<template>
  <v-card max-width="250" color="grey lighten-2">
    <v-card-text>
      <v-text-field
        v-model="name"
        :disabled="loading"
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
            :disabled="loading"
            solo
            dense
            hide-details
            placeholder="Code"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="credits"
            :disabled="loading"
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
      <v-btn text small :disabled="loading" @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-btn color="primary" :loading="loading" small @click="add">
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
    loading: false,
  }),
  methods: {
    ...mapActions('subject', ['addSubject']),
    add() {
      this.loading = true;

      this.addSubject({
        code: this.code,
        name: this.name,
        credits: parseInt(this.credits, 10),
      }).then(() => {
        this.loading = false;
        this.$emit('add');
      });
    },
  },
};
</script>
