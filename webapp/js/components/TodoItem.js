var Fluxxor = require("./../fluxxor");
var React = require("./../react");

var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [FluxChildMixin],

  propTypes: {
    todo: React.PropTypes.object.isRequired
  },

  render: function() {
    var style = {
      "text-decoration": this.props.todo.complete ? "line-through" : ""
    };

    return React.DOM.span( {style:style, onClick:this.onClick}, this.props.todo.text);
  },

  onClick: function() {
    this.getFlux().actions.toggleTodo(this.props.todo);
  }
});

