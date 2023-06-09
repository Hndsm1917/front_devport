<template>
  <div class="page">
    <div class="page__container">
      <div v-if="currentUserFields" class="page__user-data">
        <span v-for="item in currentUserFields" :key="item.id">
          {{ item }}
        </span>
      </div>

      <Block
        header="add new task"
        description="Add new user ID and task "
        submitText="ADD"
        class="page__block"
        @formSubmit="addNewTask"
      >
        <template #form>
          <input
            placeholder="title"
            v-model="formData.title"
            type="text"
            class="form__input"
          >

          <input
            placeholder="id"
            v-model="formData.id"
            type="number"
            class="form__input"
          >
        </template>
      </Block>

      <div class="page__filters">
        <Dropdown
          :val.sync="currentFilter.status"
          heading="status"
          :options="options.status"
          unique-name="status"
        />

        <Dropdown
          :val.sync="currentFilter.user"
          heading="user"
          :options="options.user"
          unique-name="user"
        />
      </div>

      <input
        placeholder="search val"
        v-model="searchVal"
        type="text"
        class="form__input"
      >

      <div v-if="currentTodo" class="page__todos">
        <Card
          class="page__todo-item"
          v-for="item in currentTodo"
          :key="item.id"
          :item="item"
          @addToFavorite="cardToFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Card from '@/components/Card.vue';
import Dropdown from '@/components/Dropdown.vue';
import Block from '@/components/Block.vue';

export default {
  name: 'Main',
  components: { Block, Dropdown, Card },

  data() {
    return {
      localTodos: this.getTodos,

      searchVal: '',

      formData: {
        id: '',
        title: '',
      },

      currentFilter: {
        status: 'All',
        user: 'All Users',
      },
    };
  },

  computed: {
    ...mapGetters({
      currentUserFields: 'users/getCurrentUserFields',
      getCurrentUser: 'users/getCurrentUser',
      getTodos: 'todos/getTodos',
      getAllUsersId: 'users/getAllUsersId',
    }),

    todos: {
      get() {
        return this.getTodos;
      },
      set(value) {
        this.localTodos = value;
      },
    },

    options() {
      return {
        status: [
          'All',
          'Completed',
          'Uncompleted',
          'Favorites',
        ],
        user: [
          'All Users',
          'Current User',
          ...this.getAllUsersId,
        ],
      };
    },

    currentTodo() {
      let result = this.localTodos;

      if (this.currentFilter.status === 'Completed') {
        result = result.filter((elem) => elem?.completed === true);
      } else if (this.currentFilter.status === 'Uncompleted') {
        result = result.filter((elem) => elem?.completed === false);
      } else if (this.currentFilter.status === 'Favorites') {
        result = result.filter((elem) => elem?.isFavorite === true);
      }

      if (this.currentFilter.user === 'Current User') {
        result = result.filter((elem) => elem.userId === this.getCurrentUser.id);
      } else if (typeof this.currentFilter.user === 'number') {
        result = result.filter((elem) => elem.userId === this.currentFilter.user);
      }

      if (this.searchVal !== '') {
        result = result.filter(({ title }) => title.toLowerCase().includes(this.searchVal));
      }

      return result;
    },
  },

  watch: {
    getTodos(val) {
      this.todos = val;
    },
  },

  mounted() {
    this.fetchTodos();
  },

  methods: {
    ...mapActions({
      fetchTodos: 'todos/fetchTodos',
    }),

    addNewTask() {
      this.localTodos.unshift({
        userId: this.formData.id,
        title: this.formData.title,
        completed: false,
        id: this.localTodos.length + 1,
      });
    },

    cardToFavorite(id) {
      let storageArrData = [];
      const storageArr = localStorage.getItem('cardArr');

      if (storageArr) storageArrData = JSON.parse(storageArr);

      if (!storageArrData.includes(id)) {
        storageArrData.push(id);
        localStorage.setItem('cardArr', JSON.stringify(storageArrData));

        this.localTodos = this.localTodos.map((obj) => {
          if (obj.id === id) {
            return { ...obj, isFavorite: true };
          }
          return obj;
        });
      } else {
        storageArrData = storageArrData.filter((val) => val !== id);
        localStorage.setItem('cardArr', JSON.stringify(storageArrData));

        this.localTodos = this.localTodos.map((obj) => {
          if (obj.id === id) {
            return { ...obj, isFavorite: false };
          }
          return obj;
        });
      }
    },
  },

};
</script>
