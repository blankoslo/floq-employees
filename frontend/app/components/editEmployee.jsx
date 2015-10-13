var React = require('react');
var Fluxxor = require('fluxxor');

var EmployeeStore = require('./../stores/EmployeeStore');
var Constants = require('./../constants.js');
var Record = require ('./../record.js');
var EmployeeForm = require('./employeeForm.jsx');

var Errors = React.createClass({
    render: function() {
        var errors = this.props.errors;
        var errorTexts = [];

        for (var error in errors) {
            errorTexts.push(error + " er et obligatorisk felt");
        }

        return (
            <div className="errorBlock">
                {errorTexts.map(error => <div className="error">{error}</div>)}
            </div>
        )
    }
});

var EditEmployee = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('EmployeeStore')
    ],

    getStateFromFlux() {
        var employeeStore = this.getFlux().store('EmployeeStore');
        return {
            createState: employeeStore.createState
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
        this.setState({createState: this.state.createState.set("created", !this.state.createState.created)});
    },

    render: function () {

        var spinner;
        var partial;

        if (this.state.createState.creating) {
            spinner = <span>Lagrer...</span>
        } else {
            spinner = <span></span>
        }

        if (!this.state.createState.created) {
            partial = <div className="formContainer">
                <Errors errors={this.state.errors} />
                <EmployeeForm initialEmployee={new Record.Employee()} onCancel={this.toggleEmployeeForm} setErrors={this.setErrors} />
            </div>;
        } else {
            partial = <button onClick={this.toggleEmployeeForm}>Legg til ansatt</button>
        }

        return <div> {spinner} {partial} </div>
    }
});

module.exports = EditEmployee;
