<template>
  <div id="app">
    <Layout class="app__layout" style="font-size: 16px">
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/layouts/MainLayout.vue';

export default {
  name: 'App',
  components: {
    Layout,
  },
};
</script>
