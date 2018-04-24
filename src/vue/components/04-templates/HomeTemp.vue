<template>
  <main class="home wrap">
    <h1 class="home__title">Home</h1>
    <ul class="home__list">
      <li class="home__item" v-for="item in somethingList" v-bind:key="item.id">{{item.text}}</li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
@import 'src/scss/shared';

.home {
  &__title {
    color: $color-text-link;
  }
}
</style>

<script>
export default {
  computed: {
    somethingList() {
      return this.$store.getters.somethingList;
    }
  }
};
</script>
