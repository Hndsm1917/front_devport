<template>
  <div id="app">
    <Main class="app-layout">
      <router-view></router-view>
    </Main>
  </div>
</template>

<script>
import Main from '@/layouts/MainLayout.vue';

export default {
  name: 'App',
  components: {
    Main,
  },
};
</script>
