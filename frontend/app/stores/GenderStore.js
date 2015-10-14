"use strict";

var Immutable = require('immutable');
var Fluxxor = require('fluxxor');
var Record = require('./../record.js');
var Constants = require('./../constants.js');

var GenderStore = Fluxxor.createStore({
    initialize() {
        this.genders = Immutable.List();
        this.loadState = new Record.LoadState();
        this.bindActions(
            Constants.GENDERS_LOAD_STARTED, this.onGendersLoading,
            Constants.GENDERS_LOAD_SUCCEEDED, this.onGendersLoaded,
            Constants.GENDERS_LOAD_FAILED, this.onGendersFailedLoading
        );
    },

    onGendersLoading() {
        this.loadState = this.loadState
                             .set("loading", true);
        this.emit("change");
    },

    onGendersLoaded(genders) {
        this.genders = genders;
        this.loadState = this.loadState
                            .set("loaded", true)
                            .set("loading", false);
        this.emit("change");
    },

    onGendersFailedLoading() {
        this.loadState = this.loadState
                            .set("loading", false)
                            .set("error", new Record({type: "general_error",
                                description: "genders failed loading"}));
        console.log("ERROR!");
    }

});

module.exports = GenderStore;
