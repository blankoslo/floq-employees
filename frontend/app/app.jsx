var React = require('react');
var ReactRouter = require('react-router');
var Fluxxor = require('fluxxor');
var _ = require('underscore');
var Constants = require('./constants.js');
var Immutable = require('immutable');
var EmployeeStore = require('./stores/EmployeeStore.js');
var actions = require('./actions.js');

var stores = {
    EmployeeStore: new EmployeeStore(),
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        //        console.log("[Dispatch]", type, payload);
    }
});

var EmployeeList = require('./components/employeeList.jsx');

var App = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React)
    ],
    
    getInitialState: function() {
        return { activeFilters: [], selectedCity: undefined };
    },

    toggleFilter: function(type) {
        if(_.contains(this.state.activeFilters, type)){
            this.setState({activeFilters: _.without(this.state.activeFilters, type)});
        } else {
            this.setState({activeFilters: this.state.activeFilters.concat(type)});
        }
    },

    render: function() {
        return (
            <div className="container">
                <header><h1>Ansattliste</h1></header>
                <EmployeeList />
            </div>
        );
    }
});

React.render(<App flux={flux} />, document.body);
