<template>
  <div class="layout">
    <div class="layout__content">
      <div class="layout__header"></div>

      <main class="layout__main">
        <slot></slot>
      </main>

      <div class="layout__footer"></div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MainLayout',

  mounted() {
    this.fetchUsers().then(() => {
      this.checkUserStatus();
    });
  },

  computed: {
    ...mapGetters({
      users: 'users/getUsers',
    }),
  },

  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers',
    }),

    ...mapMutations({
      SET_CURRENT_USER: 'users/SET_CURRENT_USER',
    }),

    checkUserStatus() {
      const storageData = localStorage.getItem('userName');

      if (storageData === null) {
        localStorage.setItem('userName', '');
      } else {
        this.users.forEach((user) => {
          if (user.username === storageData) {
            this.SET_CURRENT_USER(user);

            if (this.$route.path === '/') {
              this.$router.push('main');
            }
          }
        });
      }
    },
  },
};
</script>
