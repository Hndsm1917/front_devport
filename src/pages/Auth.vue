<template>
  <div class="page">
    <div class="page__container">
        <form @submit="fetchAuthorize" class="page__auth">
          <button type="submit" class="btn page__submit"></button>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageAuth',
  methods: {
    fetchAuthorize() {

    },
  },
};
</script>
