"use strict";

var Immutable = require('immutable');
var Fluxxor = require('fluxxor');
var Record = require('./../record.js');
var Constants = require('./../constants.js');
var MicroEvent = require('microevent');

var EmployeeStore = Fluxxor.createStore({

    initialize() {
        this.employees = Immutable.List();
        this.createState = new Record.CreateState();
        this.loadState = new Record.LoadState();
        this.bindActions(
            Constants.EMPLOYEES_LOAD_STARTED, this.onEmployeesLoading,
            Constants.EMPLOYEES_LOAD_SUCCEEDED, this.onEmployeesLoaded,
            Constants.EMPLOYEES_LOAD_FAILED, this.onEmployeesFailedLoading,
            Constants.EMPLOYEES_CREATE_STARTED, this.onEmployeesCreateStarted,
            Constants.EMPLOYEES_CREATE_SUCCEEDED, this.onEmployeesCreateSucceeded,
            Constants.EMPLOYEES_CREATE_FAILED, this.onEmployeesCreateFailed
        );
    },

    onEmployeesCreateStarted() {
        this.createState = this.createState
            .set("creating", true);
        this.emit("change");
    },

    onEmployeesCreateSucceeded() {
        this.createState = this.createState
            .set("created", true)
            .set("creating", false);
        this.emit("change");
    },

    onEmployeesCreateFailed() {
        this.createState = this.createState
            .set("creating", false)
            .set("error", new Record({type: "general_error",
                description: "employee could not be created"}));
        console.log("ERROR!");
    },

    onEmployeesLoading() {
        this.loadState = this.loadState
                             .set("loading", true);
        this.emit("change");
    },
    
    onEmployeesLoaded(employees) {
        this.employees = employees;
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
