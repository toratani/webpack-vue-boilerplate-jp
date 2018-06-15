export default {
  computed: {
    somethingList() {
      return this.$store.getters.somethingList;
    }
  }
};
