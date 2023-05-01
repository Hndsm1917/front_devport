import { getRequest } from '@/helpers/http';

// const storedDataAsString = localStorage.getItem('favoriteTodos');
// const storedData = JSON.parse(storedDataAsString);

// eslint-disable-next-line import/prefer-default-export
export const todos = {
  namespaced: true,

  state: () => ({
    todos: [],
  }),

  getters: {
    getTodos: (state) => state.todos.map((item) => ({
      ...item,
      isFavorite: false,
    })),
  },

  mutations: {
    setTodos(state, res) {
      state.todos = res;
    },
  },

  actions: {
    async fetchTodos({ commit }) {
      commit('setTodos', await getRequest('https://jsonplaceholder.typicode.com/todos'));
    },
  },
};
