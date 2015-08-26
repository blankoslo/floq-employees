"use strict";

var Immutable = require('immutable');
var Fluxxor = require('fluxxor');
var Record = require('./../record.js');
var Constants = require('./../constants.js');

var UserStore = Fluxxor.createStore({
    initialize() {
        this.loggedInUser = new Record.User();
        this.userIsLoggedIn = false;
        this.bindActions(
            Constants.USER_SIGNED_IN, this.onUserSignedIn
        );
    },

    onUserSignedIn(user) {
        console.log("Hurray, we have a sign in!")
        this.loggedInUser = user;
        this.userIsLoggedIn = true;
        this.emit("change");
    },

    onUserSignOut() {
        this.userIsLoggedIn = false;
    }

});

module.exports = UserStore;
