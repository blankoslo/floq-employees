var React = require('react');
var Fluxxor = require('fluxxor');
import { History } from 'react-router'


var Record = require ('./../record.js');
var EmployeeForm = require('./employeeForm.jsx');

var Errors = React.createClass({
    render() {
        var errors = this.props.errors;
        var errorTexts = [];

        for (var error in errors) {
            errorTexts.push(error + " er et obligatorisk felt");
        }

        return (
            <div className="errorBlock">
                {errorTexts.map(error => <div className="error">{error}</div>)}
            </div>
        );
    }
});

var CreateEmployee = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        History,
        Fluxxor.StoreWatchMixin('EmployeeStore', 'UserStore')
    ],

    getStateFromFlux() {
        var employeeStore = this.getFlux().store('EmployeeStore');
        var userStore = this.getFlux().store('UserStore');
        return {
            createState: employeeStore.createState,
            loggedInUser: userStore.loggedInUser
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

    toggleEmployeeForm(event) {
        event.preventDefault();
        this.history.pushState(null, `/employees`, null);

    },

    handleSubmit(event, employee) {
        this.getFlux().actions.createEmployee(employee, this.state.loggedInUser.token);
    },

    render() {
        return (
            <div className="formContainer">
                <Errors errors={this.state.errors} />
                <EmployeeForm initialEmployee={new Record.Employee()} onSubmit={this.handleSubmit} onCancel={this.toggleEmployeeForm} setErrors={this.setErrors} />
            </div>
        );
    }
});

module.exports = CreateEmployee;
