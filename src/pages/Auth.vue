<template>
  <div class="page">
    <div class="page__container">
      <Block
        header="add new task"
        description="Add new user ID and task "
        submitText="ADD"
        class="page__auth page__block"
        @formSubmit="fetchAuthorize"
      >
        <template #form>
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
        </template>
      </Block>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Block from '@/components/Block.vue';

export default {
  name: 'PageAuth',
  components: { Block },

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
      SET_CURRENT_USER: 'users/SET_CURRENT_USER',
    }),

    fetchAuthorize() {
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
          this.SET_CURRENT_USER(user);
        }
      });

      this.$router.push('/main');
    },
  },
};
</script>
