"use strict";

var Fluxxor = require('fluxxor');
var Constants = require('./../constants.js');

var UserStore = Fluxxor.createStore({
    initialize() {
        this.token = window.id_token;
    }
});

module.exports = UserStore;
