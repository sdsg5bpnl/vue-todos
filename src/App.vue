<template lang="pug">
  #app.container.my-5
    todos-input
    todos-list(msg="Welcome to Your Vue.js App")
</template>

<script>
import TodosInput from './components/TodosInput.vue';
import TodosList from './components/TodosList.vue';

export default {
  name: 'app',
  components: {
    TodosInput,
    TodosList,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
