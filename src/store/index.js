import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// self function
function findKey(target, id) {
  return target.findIndex(todo => todo.id === id);
}

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: '1571240683467',
        title: '我的第一個範例',
        completed: true,
      },
    ],
    // 0 未完成、1 已完成、2 全部
    viewType: 2,
  },
  getters: {
    filteredTodos: (state) => {
      let tmpTodo = state.todos;
      if (state.viewType === 0) {
        tmpTodo = state.todos.filter(todo => !todo.completed);
      }
      if (state.viewType === 1) {
        tmpTodo = state.todos.filter(todo => todo.completed);
      }
      return tmpTodo;
    },
    viewType: state => state.viewType,
  },
  mutations: {
    // localStorage 操作
    getTodoData(state, data) {
      Vue.set(state, 'todos', data);
    },
    setTodoData(state) {
      localStorage.setItem('todos', JSON.stringify({ data: state.todos }));
    },
    // 更改顯示
    changeView(state, type) {
      Vue.set(state, 'viewType', type);
    },
    // Todo 操作
    switchComplete(state, todoId) {
      const key = findKey(state.todos, todoId);
      Vue.set(state.todos[key], 'completed', !state.todos[key].completed);
    },
    addTodo(state, { id, title, completed }) {
      Vue.set(state.todos, state.todos.length, { id, title, completed });
    },
    removeTodo(state, todoId) {
      const key = findKey(state.todos, todoId);
      Vue.delete(state.todos, key);
    },
    editTodo(state, { todoId, newTitle }) {
      const key = findKey(state.todos, todoId);
      Vue.set(state.todos[key], 'title', newTitle);
    },
  },
  actions: {
    getTodoData({ commit }) {
      if (localStorage.getItem('todos')) {
        const { data } = JSON.parse(localStorage.getItem('todos'));
        commit('getTodoData', data);
      } else {
        const data = [
          {
            id: '1571240683467',
            title: '我的第一個範例',
            completed: true,
          },
        ];
        localStorage.setItem('todos', JSON.stringify({ data }));
        commit('getTodoData', data);
      }
    },
    changeView({ commit }, type) {
      commit('changeView', type);
    },
    switchComplete({ commit }, todoId) {
      commit('switchComplete', todoId);
      commit('setTodoData');
    },
    addTodo({ commit }, { id, title, completed }) {
      commit('addTodo', { id, title, completed });
      commit('setTodoData');
    },
    removeTodo({ commit }, todoId) {
      commit('removeTodo', todoId);
      commit('setTodoData');
    },
    editTodo({ commit }, { todoId, newTitle }) {
      commit('editTodo', { todoId, newTitle });
      commit('setTodoData');
    },
  },
  modules: {
  },
});
