var React = require('react');
var ReactRouter = require('react-router');
var Fluxxor = require('fluxxor');
var _ = require('underscore');
var Constants = require('./constants.js');
var Immutable = require('immutable');
var EmployeeStore = require('./stores/EmployeeStore.js');
var GenderStore = require('./stores/GenderStore.js');
var UserStore = require('./stores/UserStore.js');
var actions = require('./actions.js');

var stores = {
    EmployeeStore: new EmployeeStore(),
    GenderStore: new GenderStore(),
    UserStore: new UserStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        //        console.log("[Dispatch]", type, payload);
    }
});

var EmployeeList = require('./components/employeeList.jsx');
var CreateEmployee = require('./components/createEmployee.jsx');
var UserHeader = require('./components/userHeader.jsx');

var App = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React)
    ],

    renderGoogleLoginButton: function() {
        console.log('rendering google signin button')
        gapi.signin2.render('my-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 250,
            'height': 50,
            'longtitle': true,
            'theme': 'light',
            'onsuccess': this.onSignIn
        })
    },

    componentDidMount: function() {
        window.addEventListener('google-loaded',this.renderGoogleLoginButton);

    },

    onSignIn: function(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log('Token: ' + googleUser.getAuthResponse().id_token);

        this.getFlux().actions.setLoggedInUser(googleUser);
    },

    render: function(){
        return(
            <div className="container">
                <UserHeader /><div id="my-signin2" />
                <header><h1>Ansattliste</h1></header>
                <CreateEmployee />
                <EmployeeList />
            </div>
        );
    }
});

function triggerGoogleLoaded() {
    window.dispatchEvent(new Event('google-loaded'));
}

React.render(<App flux={flux} />, document.body);

