<template>
  <div class="page">
    <div class="page__container">
      <div v-if="currentUserFields" class="page__user-data">
        <span v-for="item in currentUserFields" :key="item.id">
          {{ item }}
        </span>
      </div>

      <div class="page__add-todo">

      </div>

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

export default {
  name: 'Main',
  components: { Dropdown, Card },

  data() {
    return {
      localTodos: this.getTodos,

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

    // todos: {
    //   get() {
    //     return this.getTodos;
    //   },
    //   set(value) {
    //     this.localTodos = value;
    //   },
    // },

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
      let statusArr = [];

      switch (true) {
        case this.currentFilter.status === 'Completed':
          statusArr = this.getTodos.filter((elem) => elem?.completed === true);
          break;

        case this.currentFilter.status === 'Uncompleted':
          statusArr = this.getTodos.filter((elem) => elem?.completed === false);
          break;

        case this.currentFilter.status === 'Favorites':
          statusArr = this.getTodos.filter((elem) => elem?.isFavorite === true);
          break;

        default:
          statusArr = this.getTodos;
      }

      switch (true) {
        case this.currentFilter.user === 'Current User':
          statusArr = statusArr.filter((elem) => elem.userId === this.getCurrentUser.id);
          break;

        case typeof this.currentFilter.user === 'number':
          statusArr = statusArr.filter((elem) => elem.userId === this.currentFilter.user);
          break;

        default:
          return statusArr;
      }

      return statusArr;
    },
  },
  //
  // watch: {
  //   getTodos(val) {
  //     this.todos = val;
  //   },
  // },

  mounted() {
    this.fetchTodos();
  },

  methods: {
    ...mapActions({
      fetchTodos: 'todos/fetchTodos',
    }),

    cardToFavorite(id) {
      // const storedDataAsString = localStorage.getItem('favoriteTodos');
      // if (storedDataAsString === null) {
      //   localStorage.setItem('favoriteTodos', '');
      // }
      // const storedData = JSON.parse(storedDataAsString);
      // console.log(storedData);
      // const dataAsString = JSON.stringify(id);

      // localStorage.setItem('todoId', dataAsString);
    },
  },

};
</script>
