<template>
  <v-card max-width="260" color="grey lighten-2">
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="code"
            :disabled="loading"
            solo
            dense
            hide-details
            label="Code"
            placeholder="EEL-123"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="credits"
            :disabled="loading"
            solo
            dense
            hide-details
            label="Credits"
            placeholder="4"
            type="number"
            step="1"
            min="1"
          />
        </v-col>
      </v-row>
      <v-text-field
        v-model="name"
        :disabled="loading"
        class="mt-3"
        solo
        dense
        hide-details
        label="Name"
        placeholder="Eletrônica II"
      />
      <p class="error--text pt-2 mb-0">{{ error }}</p>
    </v-card-text>
    <v-card-actions class="pa-4 pt-0">
      <v-spacer />
      <v-btn text small :disabled="loading" @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-btn
        :loading="loading"
        :disabled="!name || !code || !credits"
        color="primary"
        small
        @click="add"
      >
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
    error: null,
  }),
  methods: {
    ...mapActions('subject', ['addSubject']),
    add() {
      this.loading = true;
      this.error = null;

      this.addSubject({
        code: this.code,
        name: this.name,
        credits: parseInt(this.credits, 10),
      }).then(() => {
        this.loading = false;
        this.$emit('add');
      }).catch((error) => {
        this.error = error.message;
        this.loading = false;
      });
    },
  },
};
</script>
