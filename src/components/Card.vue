<template>
  <div
    class="card"
    :class="[
      {'card--completed': item.completed},
      {'card--favorite': item.isFavorite}
    ]"
  >
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

  methods: {
    addToFavorite() {
      this.$emit('addToFavorite', this.item.id);
    },
  },
};
</script>
