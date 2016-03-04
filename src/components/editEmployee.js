var React = require('react');
var Fluxxor = require('fluxxor');
import { History } from 'react-router'

var EmployeeStore = require('./../stores/EmployeeStore');
var Constants = require('./../constants.js');
var Record = require ('./../record.js');
var EmployeeForm = require('./employeeForm.jsx');
let labels = Constants.ATTR_LABELS;

var Errors = React.createClass({
    render() {
        var errors = this.props.errors;
        var errorTexts = [];

        for(var error in errors){
            errorTexts.push(labels[error] + " er et obligatorisk felt");
        }

        return (
            <div className="errorBlock">
                {errorTexts.map(error => <div className="error">{error}</div>)}
            </div>
        );
    }
});

var EditEmployee = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        History,
        Fluxxor.StoreWatchMixin('EmployeeStore')
    ],

    getStateFromFlux() {
        var employeeStore = this.getFlux().store('EmployeeStore');
        return {
            employeeStore: employeeStore
        };
    },

    getInitialState() {
        return {
            errors: {}
        };
    },

    setErrors(errors) {
        this.setState({errors: errors});
    },

    toggleEmployeeForm(event, employee) {
        event.preventDefault();
        this.history.pushState(null, `/employees/${employee.id}`, null);
    },

    handleSubmit(event, employee) {
        this.getFlux().actions.updateEmployee(employee);
        this.history.pushState(null, `/employees/${employee.id}`, null);
    },

    render() {
        var employee = this.state.employeeStore.getEmployee(this.props.params.id);
        var partial;

        if (employee) {
            partial = (
                <div className="formContainer">
                    <Errors errors={this.state.errors} />
                    <EmployeeForm onSubmit={this.handleSubmit} initialEmployee={employee} onCancel={this.toggleEmployeeForm} setErrors={this.setErrors} />
                </div>
           );
        }

        return <div> {partial} </div>;
    }
});

module.exports = EditEmployee;
