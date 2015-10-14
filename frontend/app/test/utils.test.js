
var Immutable = require('immutable');

var Record = require('./../record.js');
var Constants = require('./../constants.js');
var Utils = require('./../utils.js');

describe("stupid", function () {
    it("2 is 2", function () {
        expect(2).toBe(2);
    });
});

describe("employeeStore", function () {
    it("2 is 2", function () {
        var employee1 = Record.Employee({id: 1, name: "em1"});
        var employee2 = Record.Employee({id: 2, name: "em2"});
        var employee3 = Record.Employee({id: 3, name: "em3"});
        var employee4 = Record.Employee({id: 4, name: "em4"});
        var employees = Immutable.List.of(employee1, employee2, employee3, employee4);

        var employee = Utils.getEmployeeById(3, employees);

        expect(employee).toBe(employee3);
    });
});