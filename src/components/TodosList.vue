<template lang="pug">
  .card
    .card-header
      ul.nav.nav-tabs.card-header-tabs
        li.nav-item
          a.nav-link(
            data-toggle="tab"
            href="#"
            :class="{ 'active': viewType === 2 }"
            @click.prevent="changeView(2)"
            ) 全部
        li.nav-item
          a.nav-link(
            data-toggle="tab"
            href="#"
            :class="{ 'active': viewType === 0 }"
            @click.prevent="changeView(0)"
            ) 進行中
        li.nav-item
          a.nav-link(
            data-toggle="tab"
            href="#"
            :class="{ 'active': viewType === 1 }"
            @click.prevent="changeView(1)"
            ) 已完成
    ul.list-group.list-group-flush
      li.list-group-item(
        v-for="todo in todos"
        :key="todo.id"
        @dblclick="editTodo(todo)"
        )
        .d-flex(
          v-if="todo !== cacheTodo"
          :key="todo.id"
          )
          .form-check
            input.form-check-input(
              type="checkbox"
              :id="todo.id"
              :checked="todo.completed"
              @input="clickCheckbox(todo.id)"
              )
            label.form-check-label(
              :for="todo.id"
              :class="{ 'completed': todo.completed }"
              ) {{ todo.title }}
          button.close.ml-auto(
            type="button"
            @click="removeTodo(todo.id)"
            )
            span &times;
        input.form-control(
          type="text"
          :value="cacheTitle"
          v-else
          :key="todo.id"
          @input="inputNewTitle"
          @keyup.esc="cancelEdit"
          @keyup.enter="doneEdit"
          )
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
    viewType: {
      type: Number,
      required: true,
    },
    cacheTodo: {
      type: Object,
      required: true,
    },
    cacheTitle: {
      type: String,
      required: true,
    },
  },
  methods: {
    clickCheckbox(id) {
      this.$emit('update:Completed', id);
    },
    changeView(type) {
      this.$emit('update:view', type);
    },
    removeTodo(id) {
      this.$emit('click:removeTodo', id);
    },
    editTodo(todo) {
      this.$emit('click:editTodo', todo);
    },
    inputNewTitle(event) {
      this.$emit('update:cacheTitle', event.target.value);
    },
    cancelEdit() {
      this.$emit('click:cancelEdit');
    },
    doneEdit(type) {
      this.$emit('click:doneEdit', type);
    },
  },
};
</script>
