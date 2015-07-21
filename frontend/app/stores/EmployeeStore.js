"use strict";

var Immutable = require('immutable');
var Fluxxor = require('fluxxor');
var Record = require('./../record.js');
var Constants = require('./../constants.js');

var EmployeeStore = Fluxxor.createStore({
    initialize() {
        this.employees = Immutable.List();
        this.loadState = new Record.LoadState();
        this.loadState = new Record.LoadState();
        this.bindActions(
            Constants.EMPLOYEES_LOAD_STARTED, this.onEmployeesLoading,
            Constants.EMPLOYEES_LOAD_SUCCEEDED, this.onEmployeesLoaded,
            Constants.EMPLOYEES_LOAD_FAILED, this.onEmployeesFailedLoading
        );
    },

    onEmployeesLoading() {
        this.loadState = this.loadState
                             .set("loading", true);
        this.emit("change");
    },
    
    onEmployeesLoaded(spots) {
        this.employees = spots;
        this.loadState = this.loadState
                             .set("loaded", true)
                             .set("loading", false);
        this.emit("change");
    },

    onEmployeesFailedLoading() {
        this.loadState = this.loadState
            .set("loading", false)
            .set("error", new Record({type: "general_error",
                                      description: "employees failed loading"}));
        console.log("ERROR!");
    }

});

module.exports = EmployeeStore;
