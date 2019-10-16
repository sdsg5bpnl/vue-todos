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
      li.list-group-item
        .d-flex
          .form-check
            input.form-check-input(type="checkbox")
            label.form-check-label 範例
          button.close.ml-auto(type="button")
            span &times;
        input.form-control(
          type="text")
</template>
