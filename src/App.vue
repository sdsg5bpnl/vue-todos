<template lang="pug">
  #app.container.my-5
    todos-input(
      :new-todo="newTodo"
      @update:newTodo="inputNewTodo"
      @click:addTodo="addTodo"
    )
    todos-list(
      :todos="filteredTodos"
      :view-type="viewType"
      :cache-todo="cacheTodo"
      :cache-title="cacheTitle"
      @update:view="changeView"
      @update:Completed="clickCheckbox"
      @update:cacheTitle="inputNewTitle"
      @click:removeTodo="removeTodo"
      @click:editTodo="editTodo"
      @click:cancelEdit="cancelEdit"
      @click:doneEdit="doneEdit"
      )
</template>

<script>
import TodosInput from './components/TodosInput.vue';
import TodosList from './components/TodosList.vue';

export default {
  name: 'App',
  components: {
    TodosInput,
    TodosList,
  },
  data() {
    return {
      newTodo: '',
      cacheTodo: {},
      cacheTitle: '',
    };
  },
  computed: {
    filteredTodos() {
      return this.$store.getters.filteredTodos;
    },
    viewType() {
      return this.$store.getters.viewType;
    },
  },
  created() {
    this.$store.dispatch('getTodoData');
  },
  methods: {
    inputNewTodo(value) {
      this.newTodo = value;
    },
    clickCheckbox(todoId) {
      this.$store.dispatch('switchComplete', todoId);
    },
    changeView(type) {
      this.$store.dispatch('changeView', type);
    },
    addTodo() {
      const id = this.getTimestamp();
      const title = this.newTodo.trim();
      const completed = false;
      if (title) {
        this.$store.dispatch('addTodo', { id, title, completed });
      }
    },
    removeTodo(todoId) {
      this.$store.dispatch('removeTodo', todoId);
    },
    editTodo(todo) {
      this.cacheTodo = todo;
      this.cacheTitle = todo.title;
    },
    inputNewTitle(value) {
      this.cacheTitle = value;
    },
    cancelEdit() {
      this.cacheTodo = {};
      this.cacheTitle = '';
    },
    doneEdit() {
      const todoId = this.cacheTodo.id;
      const newTitle = this.cacheTitle;
      this.$store.dispatch('editTodo', { todoId, newTitle });
      this.cacheTodo = {};
      this.cacheTitle = '';
    },
    // Self function
    getTimestamp() {
      const timestamp = new Date().getTime().toString();
      return timestamp;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
