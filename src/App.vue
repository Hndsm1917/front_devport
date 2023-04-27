<template>
  <div id="app">
    <Main class="app-layout">
      <Auth/>
    </Main>
  </div>
</template>

<script>
import Main from "@/layouts/MainLayout.vue";
import Auth from "@/pages/Auth.vue";
export default {
  name: 'App',
  components: {
    Main,
    Auth
  }
}
</script>