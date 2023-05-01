import { getRequest } from '@/helpers/http';

const storageArr = localStorage.getItem('cardArr');
let storageArrData = '';

if (storageArr) storageArrData = JSON.parse(storageArr);

// eslint-disable-next-line import/prefer-default-export
export const todos = {
  namespaced: true,

  state: () => ({
    todos: [],
  }),

  getters: {
    getTodos: (state) => state.todos.map((item) => ({
      ...item,
      isFavorite: storageArrData.includes(item.id),
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
