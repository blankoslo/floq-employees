var Immutable = require('immutable');

var Utils = {
    getEmployeeById(id, employees) {
        return employees.filter(employee => employee.id == id).first();
    }
};

module.exports = Utils;
