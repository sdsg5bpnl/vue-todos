<template lang="pug">
  .card
    .card-header
      ul.nav.nav-tabs.card-header-tabs
        li.nav-item
          a.nav-link(data-toggle="tab" href="#") 全部
        li.nav-item
          a.nav-link(data-toggle="tab" href="#") 進行中
        li.nav-item
          a.nav-link(data-toggle="tab" href="#") 已完成
    ul.list-group.list-group-flush
      li.list-group-item(v-for="todo in todos" :key="todo.id")
        .d-flex
          .form-check
            input.form-check-input(
              type="checkbox"
              :checked="todo.completed"
              @input="clickCheckbox(todo.id)"
              )
            label.form-check-label(:class="{ 'completed': todo.completed }") {{ todo.title }}
          button.close.ml-auto(type="button")
            span &times;
        input.form-control(
          type="text")
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    clickCheckbox(id) {
      this.$emit('update:Completed', id);
    },
  },
};
</script>
