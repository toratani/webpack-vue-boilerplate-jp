<template>
  <main class="home wrap">
    <h1 class="home__title">Home</h1>
    <ul class="home__list">
      <li class="home__item" v-for="item in somethingList" v-bind:key="item.id">{{item.text}}</li>
    </ul>
  </main>
</template>

<style src="./HomeTemp.scss" lang="scss" scoped>
</style>
<script src="./HomeTemp.js">
</script>
