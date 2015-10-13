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
                <div id="my-signin2" data-onsuccess={this.onSignIn} />
            </div>
        );
    }

});

module.exports = GoogleSignIn;