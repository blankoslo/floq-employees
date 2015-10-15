"use strict";

var Immutable = require('immutable');
var Fluxxor = require('fluxxor');
var Record = require('./../record.js');
var Constants = require('./../constants.js');
var Utils = require('./../utils.js');

var EmployeeStore = Fluxxor.createStore({
    initialize() {
        this.employees = Immutable.List();
        this.createState = new Record.CreateState();
        this.updateState = new Record.CreateState();
        this.loadState = new Record.LoadState();
        this.bindActions(
            Constants.EMPLOYEES_LOAD_STARTED, this.onEmployeesLoading,
            Constants.EMPLOYEES_LOAD_SUCCEEDED, this.onEmployeesLoaded,
            Constants.EMPLOYEES_LOAD_FAILED, this.onEmployeesFailedLoading,
            Constants.EMPLOYEES_CREATE_STARTED, this.onEmployeesCreateStarted,
            Constants.EMPLOYEES_CREATE_SUCCEEDED, this.onEmployeesCreateSucceeded,
            Constants.EMPLOYEES_CREATE_FAILED, this.onEmployeesCreateFailed,
            Constants.EMPLOYEES_UPDATE_STARTED, this.onEmployeesUpdateStarted,
            Constants.EMPLOYEES_UPDATE_SUCCEEDED, this.onEmployeesUpdateSucceeded,
            Constants.EMPLOYEES_UPDATE_FAILED, this.onEmployeesUpdateFailed
        );
    },

    getEmployee(id) {
        return Utils.getEmployeeById(id, this.employees);
    },

    onEmployeesCreateStarted() {
        this.createState = this.createState
            .set("creating", true);
        this.emit("change");
    },

    onEmployeesCreateSucceeded(employee) {
        this.employees = this.employees.push(employee);

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

    onEmployeesUpdateStarted() {
        this.updateState = this.updateState
            .set("creating", true);
        this.emit("change");
    },

    onEmployeesUpdateSucceeded(employee) {
        let index = this.employees.findIndex(e => e.id == employee.id);
        this.employees = this.employees.set(index, employee);

        this.updateState = this.updateState
            .set("created", true)
            .set("creating", false);
        this.emit("change");
    },

    onEmployeesUpdateFailed() {
        this.updateState = this.updateState
            .set("creating", false)
            .set("error", new Record({type: "general_error",
                description: "employee could not be updated"}));
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
