// eslint-disable-next-line import/prefer-default-export
export const users = {
  namespaced: true,

  state: () => ({
    users: [],

    isUserAuthorize: false,
  }),

  getters: {
    getUsers: (state) => state.users,

    getUserStatus: (state) => state.isUserAuthorize,
  },

  mutations: {
    setUsers(state, res) {
      state.users = res;
    },

    setUserStatus(state, bool) {
      state.isUserAuthorize = bool;
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      commit('setUsers', await res.json());
    },
  },
};
