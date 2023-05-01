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
import { rewriteValInObj } from '@/helpers/objectsHandlers';

export default {
  name: 'Main',
  components: { Block, Dropdown, Card },

  data() {
    return {
      localTodos: this.getTodos,

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
      let result = [];

      switch (true) {
        case this.currentFilter.status === 'Completed':
          result = this.localTodos.filter((elem) => elem?.completed === true);
          break;

        case this.currentFilter.status === 'Uncompleted':
          result = this.localTodos.filter((elem) => elem?.completed === false);
          break;

        case this.currentFilter.status === 'Favorites':
          result = this.localTodos.filter((elem) => elem?.isFavorite === true);
          break;

        default:
          result = this.localTodos;
      }

      switch (true) {
        case this.currentFilter.user === 'Current User':
          result = result.filter((elem) => elem.userId === this.getCurrentUser.id);
          break;

        case typeof this.currentFilter.user === 'number':
          result = result.filter((elem) => elem.userId === this.currentFilter.user);
          break;

        default:
          return result;
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
      const storageArr = localStorage.getItem('cardArr');

      if (storageArr) {
        const storageArrData = JSON.parse(storageArr);

        if (!storageArrData.includes(id)) {
          localStorage.setItem('cardArr', JSON.stringify([...storageArrData, id]));
          // rewriteValInObj('isFavorite', true, 'id');

          this.localTodos = this.localTodos.map((_obj) => {
            const obj = { ..._obj };
            if (_obj.id === id) {
              obj.isFavorite = true;
            }

            return obj;
          });
        } else {
          const newData = storageArrData.filter((val) => val !== id);
          localStorage.setItem('cardArr', JSON.stringify(newData));

          this.localTodos = this.localTodos.map((_obj) => {
            const obj = { ..._obj };
            if (_obj.id === id) {
              obj.isFavorite = false;
            }

            return obj;
          });
        }
      } else {
        localStorage.setItem('cardArr', JSON.stringify([id]));
      }
    },
  },

};
</script>
