<template>
  <v-card
    :class="cardClasses"
    :color="cardColor"
    min-width="200"
    max-width="200"
    @mouseover="showSettings = true"
    @mouseleave="showSettings = false"
  >
    <v-card-text class="pa-3">
      <div class="d-flex">
        <div class="text-caption my-0">{{ code }} • {{ credits }}&nbsp;</div>
        <v-spacer/>
        <v-btn v-if="showSettings" x-small icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
      <p class="font-weight-bold text-body-1 my-0 text-truncate">
        {{ name }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
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
    showSettings: false,
    cardClasses: ['my-3', 'attempt-card'],
  }),
  computed: {
    cardColor() {
      const colors = [
        '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB',
        '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3',
        '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#CFD8DC',
        // Escuro demais (lighten 3)
        // '#FFCDD2', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9',
        // '#81D4FA', '#80DEEA', '#80CBC4', '#A5D6A7', '#C5E1A5', '#E6EE9C',
        // '#FFF59D', '#FFE082', '#FFCC80', '#FFAB91', '#BCAAA4', '#B0BEC5',
      ];

      let hash = 0;
      if (this.code.length === 0) {
        return colors[hash];
      }
      for (let i = 0; i < this.code.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        hash = this.code.charCodeAt(i) + ((hash << 5) - hash);
        // eslint-disable-next-line no-bitwise
        hash &= hash;
      }
      hash = ((hash % colors.length) + colors.length) % colors.length;
      return colors[hash];
    },
  },
  methods: {
  },
};
</script>
