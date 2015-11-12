"use strict";

var Record = require('./record.js');
var apiClient = require('./apiclient.js');
var Constants = require('./constants.js');

var client = apiClient("http://localhost:8081/api");

function parseError(req) {
    const payload = JSON.parse(req.responseText);
    return new Record.Error({
        type: payload.type,
        description: payload.description,
        resourceId: payload.resourceId});
}

var actions = {
    loadGenders() {
        var token = this.flux.store('UserStore').token;

        this.dispatch(Constants.GENDERS_LOAD_STARTED);
        client.getGenders(token).then(
            (e) => this.dispatch(Constants.GENDERS_LOAD_SUCCEEDED, e),
            (e) => this.dispatch(Constants.GENDERS_LOAD_FAILED, parseError(e))
        );
    },

    loadEmployees() {
        var token = this.flux.store('UserStore').token;

        this.dispatch(Constants.EMPLOYEES_LOAD_STARTED);
        client.getEmployees(token).then(
            (e) => this.dispatch(Constants.EMPLOYEES_LOAD_SUCCEEDED, e),
            (e) => this.dispatch(Constants.EMPLOYEES_LOAD_FAILED, parseError(e))
        );
    },

    createEmployee(employee) {
        var token = this.flux.store('UserStore').token;

        this.dispatch(Constants.EMPLOYEES_CREATE_STARTED, employee);
        client.createEmployee(employee, token).then(
            (e) => this.dispatch(Constants.EMPLOYEES_CREATE_SUCCEEDED, e),
            (e) => this.dispatch(Constants.EMPLOYEES_CREATE_FAILED, parseError(e))
        );
    },

    updateEmployee(employee) {
        var token = this.flux.store('UserStore').token;

        this.dispatch(Constants.EMPLOYEES_UPDATE_STARTED, employee);
        client.updateEmployee(employee, token).then(
            (e) => this.dispatch(Constants.EMPLOYEES_UPDATE_SUCCEEDED, e),
            (e) => this.dispatch(Constants.EMPLOYEES_UPDATE_FAILED, parseError(e))
        );
    }
};

module.exports = actions;
