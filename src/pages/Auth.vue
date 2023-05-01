<template>
  <div class="page">
    <div class="page__container">
      <div class="page__auth block">
        <div class="block__header">
          <span class="block__font block__font--header">
            description
          </span>
        </div>

        <form @submit="fetchAuthorize" class="block__form form">
          <div class="form__description">
            <span class="form__font form__font--description">
              description
            </span>
          </div>

          <div class="form__grid">
            <input
              placeholder="username"
              v-model="formData.username"
              type="text"
              class="form__input"
            >

            <input
              placeholder="Phone Number"
              v-model="formData.phone"
              type="text"
              class="form__input"
            >

            <span class="form__font form__font--error" v-if="isInvalid">login error</span>
          </div>

          <button type="submit" class="btn form__submit">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'PageAuth',

  data() {
    return {
      isInvalid: false,

      formData: {
        username: '',
        phone: '',
      },
    };
  },

  computed: {
    ...mapGetters({
      users: 'users/getUsers',
    }),
  },

  methods: {
    ...mapMutations({
      setCurrentUser: 'users/setCurrentUser',
    }),

    fetchAuthorize(e) {
      e.preventDefault();

      const hasDuplicate = this.users.filter((user) => user.username === this.formData.username
        && user.phone === this.formData.phone);

      if (hasDuplicate.length > 0) {
        this.gotoNextRoute();
        this.isInvalid = false;
      } else {
        this.isInvalid = true;
        console.log(this.users[6].username);
        console.log(this.users[6].phone);
      }
    },

    gotoNextRoute() {
      this.users.forEach((user) => {
        if (user.username === this.formData.username) {
          localStorage.setItem('userName', this.formData.username);
          this.setCurrentUser(user);
        }
      });

      this.$router.push('/main');
    },
  },
};
</script>
