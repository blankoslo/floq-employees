"use strict";

var Record = require('./record.js');
var apiClient = require('./apiclient.js');
var Constants = require('./constants.js');

var client = apiClient("./api");

function parseError(req) {
        const payload = JSON.parse(req.responseText);
        return new Record.Error({
            type: payload.type,
            description: payload.description,
            resourceId: payload.resourceId});
}

var actions = {

    setLoggedInUser(googleUser) {
        var user = new Record.User({name: googleUser.getBasicProfile().getName(), pictureUrl: googleUser.getBasicProfile().getImageUrl(),
            token: googleUser.getAuthResponse().id_token, email: googleUser.getBasicProfile().getEmail()});
        this.dispatch(Constants.USER_SIGNED_IN, user)
    },

    loadGenders(token) {
        this.dispatch(Constants.GENDERS_LOAD_STARTED);
        client.getGenders(token).then(
            (e) => this.dispatch(Constants.GENDERS_LOAD_SUCCEEDED, e),
            (e) => this.dispatch(Constants.GENDERS_LOAD_FAILED, parseError(e))
        );
    },

    loadEmployees(token) {
        this.dispatch(Constants.EMPLOYEES_LOAD_STARTED);
        client.getEmployees(token).then(
            (e) => this.dispatch(Constants.EMPLOYEES_LOAD_SUCCEEDED, e),
            (e) => this.dispatch(Constants.EMPLOYEES_LOAD_FAILED, parseError(e))
        );
    },

    createEmployee(employee, token) {
        this.dispatch(Constants.EMPLOYEES_CREATE_STARTED, employee);
        client.createEmployee(employee, token).then(
            (e) => this.dispatch(Constants.EMPLOYEES_CREATE_SUCCEEDED, e),
            (e) => this.dispatch(Constants.EMPLOYEES_CREATE_FAILED, parseError(e))
        );
    }
};

module.exports = actions;
