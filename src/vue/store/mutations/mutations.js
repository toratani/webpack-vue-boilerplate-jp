import Vue from 'vue';

// Mutations
export default {
  // リスト更新
  setSomethingList(state, payload) {
    Vue.set(state, 'somethingList', payload);
  }
};
