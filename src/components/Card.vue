<template>
  <div :class="cardClasses">
    <div class="card__title">
      {{ item.title }}
    </div>

    <button type="button" @click="addToFavorite" class="card__favorite">
      favorite
    </button>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    cardClasses() {
      return {
        card: true,
        'card--completed': this.item.completed,
        'card--favorite': this.item.isFavorite,
      };
    },
  },

  methods: {
    addToFavorite() {
      this.$emit('addToFavorite', this.item.id);
    },
  },
};
</script>
