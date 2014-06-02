var Fluxxor = require("./../fluxxor");
module.exports = {

  addTodo: function(text) {
    this.dispatch("ADD_TODO", {text: text});
  },

  toggleTodo: function(todo) {
    this.dispatch("TOGGLE_TODO", {todo: todo});
  },

  clearTodos: function() {
    this.dispatch("CLEAR_TODOS");
  },

  undo: function() {
    this.dispatch("UNDO");
  },

  redo: function() {
    this.dispatch("REDO");
  }
};