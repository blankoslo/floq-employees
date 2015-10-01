// fluxxor depends on lodash, which expects the global var to be set,
// which webpack doesn't seem to do by default.
// https://github.com/lodash/lodash/issues/915
// Workaround until I figure out how to expose global in webpack:
window.global = window;


var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var Fluxxor = require('fluxxor');
var _ = require('underscore');
var Constants = require('./constants.js');
var Immutable = require('immutable');
var EmployeeStore = require('./stores/EmployeeStore.js');
var GenderStore = require('./stores/GenderStore.js');
var UserStore = require('./stores/UserStore.js');
var actions = require('./actions.js');
require("../style/main.less");


var stores = {
    EmployeeStore: new EmployeeStore(),
    GenderStore: new GenderStore(),
    UserStore: new UserStore()
};

var flux = new Fluxxor.Flux(stores, actions);
var FluxMixin = Fluxxor.FluxMixin(React);

var EmployeeList = require('./components/employeeList.jsx');
var CreateEmployee = require('./components/createEmployee.jsx');
var UserHeader = require('./components/userHeader.jsx');
var GoogleSignIn = require('./components/googleSignIn.jsx');

var App = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Router.State,
        Router.Navigation
    ],

    render: function(){
        return(
            <div className="container">
                <UserHeader />
                <header><h1>Ansattliste</h1></header>
                <CreateEmployee />
                <EmployeeList />
            </div>
        );
    }
});



var AppWrapper = React.createClass({
    mixins: [FluxMixin],

    render() {
        return (
                <div className="container">
                    <GoogleSignIn />

                    <div className="page">
                        <RouteHandler/>
                    </div>
                </div>
        );
    }
});

var Empty = React.createClass({
    mixins: [FluxMixin],

    render() {
        return (
            <div></div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={AppWrapper}>
        <Route name="empty" path="empty" handler={Empty}/>
        <Route name="list" path="list" handler={App}/>
        <DefaultRoute handler={App}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler flux={flux}/>, document.body);
});

window.global.triggerGoogleLoaded = function() {
    window.dispatchEvent(new Event('google-loaded'));
};
