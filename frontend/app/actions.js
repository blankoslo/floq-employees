"use strict";

var Record = require('./record.js');
var apiClient = require('./apiclient.js');
var Constants = require('./constants.js');

var client = apiClient("./api");

function parseError(req) {
    alert("hea");
        const payload = JSON.parse(req.responseText);
        return new Record.Error({
            type: payload.type,
            description: payload.description,
            resourceId: payload.resourceId});
}

var actions = {
    loadGenders() {
        this.dispatch(Constants.GENDERS_LOAD_STARTED);
        client.getGenders().then(
            (e) => this.dispatch(Constants.GENDERS_LOAD_SUCCEEDED, e),
            (e) => this.dispatch(Constants.GENDERS_LOAD_FAILED, parseError(e))
        );
    },

    loadEmployees() {
        this.dispatch(Constants.EMPLOYEES_LOAD_STARTED);
        client.getEmployees().then(
            (e) => this.dispatch(Constants.EMPLOYEES_LOAD_SUCCEEDED, e),
            (e) => this.dispatch(Constants.EMPLOYEES_LOAD_FAILED, parseError(e))
        );
    },

    createEmployee(employee) {
        alert("yo")
        this.dispatch(Constants.EMPLOYEES_CREATE_STARTED, employee);
        client.createEmployee(employee).then(
            (e) => this.dispatch(Constants.EMPLOYEES_CREATE_SUCCEEDED, e),
            (e) => this.dispatch(Constants.EMPLOYEES_CREATE_FAILED, parseError(e))
        );
    }
};

module.exports = actions;
