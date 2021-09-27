<template>
  <v-btn icon x-large outlined elevation="0" plain @click="$emit('click')">
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
