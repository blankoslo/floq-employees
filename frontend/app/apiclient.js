'use strict';

var Immutable = require('immutable');
var Record = require('./record.js');
var moment = require('moment');

var apiClient = function(rootUri) {

    let descriptionPromise = null;

    function rootArrayToMap(root) {
        return root.reduce((acc, cur) => { 
            acc[cur.name] = cur;
            return acc;
        }, {});
    }

    function handleUnauthorized() {
        //TODO: handle unauthorized
        console.log("unauth");
    }

    function employeeUrlFor(id) {
        return e => e.employee.template.replace('{employeeid}', id);
    }

    function xhr(method, url, data, token) {
        const isSuccess = n => n >= 200 && n < 400;
        const isUnauthorized = n => n === 401;
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.onload = () => isSuccess(req.status) ? resolve(req) : isUnauthorized(req.status) ? handleUnauthorized() : reject(req);
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
                Immutable.fromJS(employeesJs).map(parseEmployee)));
    }

    function parseGenders(payload) {
        return Immutable.fromJS(payload).map(gender =>
            new Record.Gender({name: gender, value: gender}));
    }

    function parseEmployee(payload) {
        function isoToLocale(isoDate) {
            if(isoDate) return moment(isoDate).format('DD/MM/YYYY');
            else return isoDate;
        }

        return new Record.Employee({id: payload.get('id'), firstName: payload.get('firstName'), lastName: payload.get('lastName'),
            phone: payload.get('phone'), email: payload.get('email'), gender: payload.get('gender'), birthDate: isoToLocale(payload.get('birthDate')),
            dateOfEmployment: isoToLocale(payload.get('dateOfEmployment')), terminationDate: isoToLocale(payload.get('terminationDate')),
            emergencyContactName: payload.get('emergencyContactName'),emergencyContactPhone: payload.get('emergencyContactPhone'),
            emergencyContactRelation: payload.get('emergencyContactRelation'),address: payload.get('address'),
            postalCode: payload.get('postalCode'), city: payload.get('city')});
    }

    function localeToIsoInEmployee(employee){
        function localeToISO(localeDate) {
            if(localeDate) return moment(localeDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            else localeDate;
        }

        return employee.withMutations((emp) => {
            emp.set('birthDate', localeToISO(emp.birthDate))
                .set('dateOfEmployment', localeToISO(emp.dateOfEmployment))
                .set('terminationDate', localeToISO(emp.terminationDate))
        });

    }

    function createEmployee(employee, token) {
        return getDescription(token)
            .then(e => e.employees.href)
            .then(e => xhrPost(e, localeToIsoInEmployee(employee).toJS(), token))
            .then(parseResponseWith(parseEmployee));
    }

    function updateEmployee(employee, token) {
        return getDescription(token)
            .then(e => e.employee.template.replace('{employeeid}', employee.id))
            .then(e => xhrPut(e, localeToIsoInEmployee(employee).toJS(), token))
            .then(parseResponseWith(parseEmployee));
    }

    return {
        getGenders, getEmployees, createEmployee, updateEmployee
    };
}

module.exports = apiClient;
