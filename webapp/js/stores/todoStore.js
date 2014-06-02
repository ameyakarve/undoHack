var Fluxxor = require("./../fluxxor");
var Mori = require("./../mori");
module.exports = Fluxxor.createStore({
  actions: {
    "ADD_TODO": "onAddTodo",
    "TOGGLE_TODO": "onToggleTodo",
    "CLEAR_TODOS": "onClearTodos",
    "UNDO": "undo",
    "REDO": "redo"
  },

  initialize: function() {
    this.todos = [];
    this.todosState = "BLANK_STATE";
    this.undoStates = Mori.list("BLANK_STATE");
    this.redoStates = Mori.list();
    this.canUndo = false;
    this.canRedo = false;
  },

  onAddTodo: function(payload) {
    this.todos.push({text: payload.text, complete: false});
    this.todosState = JSON.stringify(this.todos);
    this.undoStates = Mori.conj(this.undoStates, this.todosState);
    this.redoStates = Mori.list();
    this.canUndo = true;
    this.canRedo = false;
    this.emit("change");
  },

  onToggleTodo: function(payload) {
    payload.todo.complete = !payload.todo.complete;
    this.todosState = JSON.stringify(this.todos);
    this.undoStates = Mori.conj(this.undoStates, this.todosState);
    this.redoStates = Mori.list();
    this.canUndo = true;
    this.canRedo = false;
    this.emit("change");
  },

  onClearTodos: function() {
    this.todos = this.todos.filter(function(todo) {
      return !todo.complete;
    });
    this.todosState = JSON.stringify(this.todos);
    this.undoStates = Mori.conj(this.undoStates, this.todosState);
    this.redoStates = Mori.list();
    this.canUndo = true;
    this.canRedo = false;
    this.emit("change");

  },

  undo: function() {
    this.redoStates = Mori.conj(this.redoStates, Mori.first(this.undoStates));
    this.undoStates = Mori.drop(1, this.undoStates);
    this.todosState = Mori.first(this.undoStates);
    this.canUndo = Mori.count(this.undoStates) > 1;
    this.canRedo = true;
    if(Mori.count(this.undoStates) > 1) {
      this.todos = JSON.parse(this.todosState);
    }
    else this.todos = [];
    this.emit("change");
  },

  redo: function() {
    this.undoStates = Mori.conj(this.undoStates, Mori.first(this.redoStates));
    this.todosState = Mori.first(this.redoStates);
    this.redoStates = Mori.drop(1, this.redoStates);
    this.canRedo = !Mori.is_empty(this.redoStates);
    this.canUndo = true;
    this.todos = JSON.parse(this.todosState);
    this.emit("change");
  },

  getState: function() {
    return {
      todos: this.todos,
      canUndo: this.canUndo,
      canRedo: this.canRedo
    };
  }
});