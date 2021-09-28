<template>
  <v-btn fab color="primary" @click="$emit('click')">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'AddSemesterButton',
  props: {},
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
};
</script>
