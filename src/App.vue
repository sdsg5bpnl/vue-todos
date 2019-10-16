<template lang="pug">
  #app.container.my-5
    todos-input(
      :new-todo="newTodo"
      @update:newTodo="inputNewTodo"
      @click:addTodo="addTodo"
    )
    todos-list(
      :todos="todos"
      @update:Completed="clickCheckbox"
      )
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
  data() {
    return {
      newTodo: '',
      todos: [
        {
          id: '1571240683467',
          title: '範例',
          completed: true,
        },
      ],
    };
  },
  methods: {
    inputNewTodo(value) {
      this.newTodo = value;
    },
    clickCheckbox(todoId) {
      const key = this.todos.findIndex(todo => todo.id === todoId);
      this.$set(this.todos[key], 'completed', !this.todos[key].completed);
    },
    addTodo() {
      const id = this.getTimestamp();
      const title = this.newTodo;
      const completed = false;
      this.todos.push({ id, title, completed });
    },
    // Self function
    getTimestamp() {
      const timestamp = new Date().getTime();
      return timestamp;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
