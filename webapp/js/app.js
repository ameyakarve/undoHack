var React = require("./react"), 
  Fluxxor = require("./fluxxor");

var stores = require("./stores"), 
  actions = require("./actions/todoActions");

window.React = React;
var flux = new Fluxxor.Flux(stores, actions);
window.flux = flux;
var Application = require("./components/Application"), 
  TodoItem = require("./components/TodoItem");
window.Application = Application;
window.TodoItem = TodoItem;
//console.log(Application({flux: flux}));


React.renderComponent(Application( {flux:flux} ), document.getElementById("app"));


