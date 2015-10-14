var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Fluxxor = require('fluxxor');
var UserStore = require('../stores/UserStore.js');


var GoogleSignIn = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Router.State,
        Router.Navigation
    ],

    renderGoogleLoginButton: function() {
        console.log('rendering google signin button')
        gapi.signin2.render('my-signin2', {
            'scope': 'profile',
            'width': 250,
            'height': 50,
            'longtitle': true,
            'theme': 'light',
            'onsuccess': this.onSignIn,
            'onfailure': this.onFailure
        })
    },

    componentDidMount: function() {
        window.addEventListener('google-loaded', this.renderGoogleLoginButton);
    },

    onSignIn: function(googleUser) {
        let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log('Token: ' + token);

        this.getFlux().actions.setLoggedInUser(googleUser);
        this.getFlux().actions.loadGenders(token);
        this.getFlux().actions.loadEmployees(token);
    },

    onFailure: function() {
        console.log("An error occured with logging in!");
    },

    render: function() {
        return(
            <div className="container">
                <div id="my-signin2"/>
            </div>
        );
    }

});

module.exports = GoogleSignIn;
