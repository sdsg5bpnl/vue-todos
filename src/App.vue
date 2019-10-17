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
          title: '我的第一個範例',
          completed: true,
        },
      ],
      viewType: 2,
      cacheTodo: {},
      cacheTitle: '',
    };
  },
  computed: {
    filteredTodos() {
      let tmpTodo = this.todos;
      if (this.viewType === 0) {
        tmpTodo = this.todos.filter(todo => todo.completed === false);
      }
      if (this.viewType === 1) {
        tmpTodo = this.todos.filter(todo => todo.completed === true);
      }
      return tmpTodo;
    },
  },
  created() {
    if (localStorage.getItem('todos')) {
      const { data } = JSON.parse(localStorage.getItem('todos'));
      this.todos = data;
    } else {
      localStorage.setItem('todos', JSON.stringify({ data: [] }));
    }
  },
  methods: {
    inputNewTodo(value) {
      this.newTodo = value;
    },
    clickCheckbox(todoId) {
      const key = this.todos.findIndex(todo => todo.id === todoId);
      this.$set(this.todos[key], 'completed', !this.todos[key].completed);
      localStorage.setItem('todos', JSON.stringify({ data: this.todos }));
    },
    changeView(type) {
      this.viewType = type;
    },
    addTodo() {
      const id = this.getTimestamp();
      const title = this.newTodo;
      const completed = false;
      this.todos.push({ id, title, completed });
      localStorage.setItem('todos', JSON.stringify({ data: this.todos }));
    },
    removeTodo(todoId) {
      const key = this.todos.findIndex(todo => todo.id === todoId);
      this.$delete(this.todos, key);
      localStorage.setItem('todos', JSON.stringify({ data: this.todos }));
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
      const key = this.todos.findIndex(todo => todo.id === this.cacheTodo.id);
      this.$set(this.todos[key], 'title', this.cacheTitle);
      this.cacheTodo = {};
      this.cacheTitle = '';
      localStorage.setItem('todos', JSON.stringify({ data: this.todos }));
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
