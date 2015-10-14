var React = require('react');
var Fluxxor = require('fluxxor');

var EmployeeStore = require('./../stores/EmployeeStore');
var Constants = require('./../constants.js');
var Record = require ('./../record.js');
var EmployeeForm = require('./employeeForm.jsx');
import { History } from 'react-router'

var Constants = require('../constants.js');
let labels = Constants.ATTR_LABELS;

var ViewEmployee = React.createClass({
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

    closeView() {
        event.preventDefault();
        this.history.pushState(null, `/employees`, null);
    },

    editView() {
        event.preventDefault();
        this.history.pushState(null, `/employee/${this.props.params.id}/edit`, null);
    },

    render() {
        var employee = this.state.employeeStore.getEmployee(this.props.params.id);
        var partial;

        if (employee) {
            partial = <div className="formContainer">
                <button className="closeButton" onClick={this.closeView}>X</button><br/>
                <button className="closeButton" onClick={this.editView}>Endre</button>
                <div className="form-row">
                    <LabelValue label={labels.firstName} value={employee.firstName} />
                    <LabelValue label={labels.lastName} value={employee.lastName} />
                    <LabelValue label={labels.phone} value={employee.phone} />
                    <LabelValue label={labels.email} value={employee.email} />
                </div>
                <div className="form-row">
                    <LabelValue label={labels.gender} value={employee.gender} />
                    <LabelValue label={labels.birthDate} value={employee.birthDate} />
                    <LabelValue label={labels.dateOfEmployment} value={employee.dateOfEmployment} />
                </div>
                <div className="form-row">
                    <LabelValue label={labels.emergencyContactName} value={employee.emergencyContactName} />
                    <LabelValue label={labels.emergencyContactPhone} value={employee.emergencyContactPhone} />
                    <LabelValue label={labels.emergencyContactRelation} value={employee.emergencyContactRelation} />
                </div>
                <div className="form-row">
                    <LabelValue label={labels.address} value={employee.address} />
                    <LabelValue label={labels.postalCode} value={employee.postalCode} />
                    <LabelValue label={labels.city} value={employee.city} />
                </div>
            </div>
        } else {
            partial = <div></div>
        }

        return partial;
    }
});

var LabelValue = React.createClass({
    render() {
        return <div className="form-group"><label className="control-label">{this.props.label}</label><div>{this.props.value}</div></div>
    }
});

module.exports = ViewEmployee;
