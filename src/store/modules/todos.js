import { getRequest } from '@/helpers/http';

const storageArr = localStorage.getItem('cardArr');
const storageArrData = storageArr ? JSON.parse(storageArr) : [];

// eslint-disable-next-line import/prefer-default-export
export const todos = {
  namespaced: true,

  state: {
    todos: [],
  },

  getters: {
    getTodos(state) {
      return state.todos.map((item) => ({
        ...item,
        isFavorite: storageArrData.includes(item.id),
      }));
    },
  },

  mutations: {
    SET_TODOS(state, res) {
      state.todos = res;
    },
  },

  actions: {
    async fetchTodos({ commit }) {
      commit('SET_TODOS', await getRequest('https://jsonplaceholder.typicode.com/todos'));
    },
  },
};
