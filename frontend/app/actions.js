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
    loadEmployees() {
        this.dispatch(Constants.EMPLOYEES_LOAD_STARTED);
        client.getEmployees().then(
            (e) => this.dispatch(Constants.EMPLOYEES_LOAD_SUCCEEDED, e),
            (e) => this.dispatch(Constants.EMPLOYEES_LOAD_FAILED, parseError(e))
        );
    },

    createEmployee(empployee) {
        this.dispatch(Constants.CLIENT_CREATE_STARTED, newClient);
        client.createClient(newClient).then(
            (e) => this.dispatch(Constants.CLIENT_CREATE_SUCCEEDED, e),
            (e) => this.dispatch(Constants.CLIENT_CREATE_FAILED, parseError(e))
        );
    }

};

module.exports = actions;
