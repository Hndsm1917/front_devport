import { recursiveObjFields } from '@/helpers/objectsHandlers';
import { getRequest } from '@/helpers/http';

// eslint-disable-next-line import/prefer-default-export
export const users = {
  namespaced: true,

  state: {
    users: [],
    currentUser: null,
  },

  getters: {
    getUsers: (state) => state.users,
    getCurrentUser: (state) => state.currentUser,
    getAllUsersId: (state) => state.users.map((user) => user.id),
    getCurrentUserFields: (state) => (state.currentUser === null ? '' : recursiveObjFields(state.currentUser)),
  },

  mutations: {
    SET_USERS(state, res) {
      state.users = res;
    },

    SET_CURRENT_USER(state, res) {
      state.currentUser = res;
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      commit('SET_USERS', await getRequest('https://jsonplaceholder.typicode.com/users'));
    },
  },
};
