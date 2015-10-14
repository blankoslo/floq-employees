'use strict';

var Immutable = require('immutable');
var Record = require('./record.js');

var apiClient = function(rootUri) {

    let descriptionPromise = null;

    function rootArrayToMap(root) {
        return root.reduce((acc, cur) => { 
            acc[cur.name] = cur;
            return acc;
        }, {});
    }

    function employeeUrlFor(id) {
        return e => e.employee.template.replace('{employeeid}', id);
    }

    function xhr(method, url, data, token) {
        const isSuccess = n => n >= 200 && n < 400;
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.onload = () => isSuccess(req.status) ? resolve(req) : reject(req);
            req.onerror = () => reject(req);
            req.open(method, url);
            req.setRequestHeader('Authorization', token);
            if (data) {
                req.setRequestHeader('Content-Type', 'text/json');
            }
            req.send(data ? JSON.stringify(data) : null);
        });
    }

    const xhrGet = (url, token) => xhr('get', url, null, token);
    const xhrPost = (url, data, token) => xhr('post', url, data, token);
    const xhrPut = (url, data, token) => xhr('put', url, data, token);
    const xhrDelete = (url) => xhr('delete', url);

    function parseResponse(req) {
        return JSON.parse(req.responseText);
    }

    const parseResponseWith = (transformer) => (req) =>
        transformer(JSON.parse(req.responseText));

    function getDescription(token) {
        if (!descriptionPromise) {
            descriptionPromise = xhrGet(rootUri, token)
                .then(parseResponse)
                .then(rootArrayToMap);
        }
        return descriptionPromise;
    }

    function getGenders(token) {
        return getDescription(token)
            .then(e => xhrGet(e.genders.href, token))
            .then(parseResponseWith(parseGenders));
    }

    function getEmployees(token) {
        return getDescription(token)
            .then(e => xhrGet(e.employees.href, token))
            .then(parseResponseWith(employeesJs =>
                Immutable.fromJS(employeesJs).map(employeesMap =>
                    new Record.Employee(employeesMap))));
    }

    function parseGenders(payload) {
        return Immutable.fromJS(payload).map(gender =>
            new Record.Gender({name: gender, value: gender}));
    }

    function parseEmployees(payload) {
        return new Record.Employee(payload);
    }

    function createEmployee(employee, token) {
        return getDescription(token)
            .then(e => e.employees.href)
            .then(e => xhrPost(e, employee.toJS(), token))
            .then(parseResponseWith(parseEmployees));
    }

    function updateEmployee(employee, token) {
        return getDescription(token)
            .then(e => e.employee.template.replace('{employeeid}', employee.id))
            .then(e => xhrPut(e, employee.toJS(), token))
            .then(parseResponseWith(parseEmployees));
    }

    return {
        getGenders, getEmployees, createEmployee, updateEmployee
    };
}

module.exports = apiClient;
