const Vue = require('vue');

// Mutations
module.exports = {
  // リスト更新
  setSomethingList(state, payload) {
    Vue.set(state, 'somethingList', payload);
  },
};
