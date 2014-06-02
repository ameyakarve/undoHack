var Fluxxor = require("./../fluxxor");
var React = require("./../react");
var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TodoStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    // Normally we'd use one key per store, but we only have one store, so
    // we'll use the state of the store as our entire state here.
    return flux.store("TodoStore").getState();
  },

  render: function() {
    return React.DOM.div(null, 
      React.DOM.div(null, 
        this.state.canUndo ? React.DOM.button( {onClick: this.undo},  " Undo " ) : React.DOM.button( {disabled:true},  " Undo " ),
        this.state.canRedo ? React.DOM.button( {onClick: this.redo},  " Redo " ) : React.DOM.button( {disabled:true},  " Redo " )
      ),
      React.DOM.ul(null, 
        this.state.todos.map(function(todo, i) {
          return React.DOM.li( {key:i}, TodoItem( {todo:todo} ));
        })
      ),
      React.DOM.form( {onSubmit:this.onSubmitForm}, 
        React.DOM.input( {ref:"input", type:"text", size:"30", placeholder:"New Todo"} ),
        React.DOM.input( {type:"submit", value:"Add Todo"} )
      ),
      React.DOM.button( {onClick:this.clearCompletedTodos}, "Clear Completed")
      
    )
  },

  onSubmitForm: function(e) {
    e.preventDefault();
    var node = this.refs.input.getDOMNode();
    this.getFlux().actions.addTodo(node.value);
    node.value = "";
  },

  clearCompletedTodos: function(e) {
    this.getFlux().actions.clearTodos();
  },

  undo: function() {
    this.getFlux().actions.undo();
  }, 

  redo: function() {
    this.getFlux().actions.redo();
  }
});
  
