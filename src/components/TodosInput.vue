<template lang="pug">
  .input-group.mb-3
    .input-group-prepend
      span.input-group-text 待辦事項
    input.form-control(
      type="text"
      placeholder="準備要做的任務"
      :value="newTodo"
      @input="inputNewTodo"
      @keyup.esc="inputNewTodo"
      @keyup.enter="addTodo"
      )
    .input-group-append
      button.btn.btn-primary(
        type="button"
        @click="addTodo") 新增
</template>

<script>
export default {
  props: {
    newTodo: {
      type: String,
      required: true,
    },
  },
  methods: {
    inputNewTodo(event) {
      if (event.key === 'Escape') {
        this.$emit('update:newTodo', '');
      } else {
        this.$emit('update:newTodo', event.target.value);
      }
    },
    addTodo() {
      this.$emit('click:addTodo');
    },
  },
};
</script>
