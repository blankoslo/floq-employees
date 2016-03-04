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
        this.history.pushState(null, `/employees/${this.props.params.id}/edit`, null);
    },

    render() {
        var employee = this.state.employeeStore.getEmployee(this.props.params.id);
        var partial;

        if (employee) {
            partial = <div className="mdl-grid content-box">
                <div className="mdl-cell mdl-cell--3-col">
                    <LabelValue label={labels.firstName} value={employee.firstName} />
                    <LabelValue label={labels.lastName} value={employee.lastName} />
                    <LabelValue label={labels.phone} value={employee.phone} />
                    <LabelValue label={labels.email} value={employee.email} />
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                    <LabelValue label={labels.gender} value={labels[employee.gender]} />
                    <LabelValue label={labels.birthDate} value={employee.birthDate} />
                    <LabelValue label={labels.dateOfEmployment} value={employee.dateOfEmployment} />
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                    <LabelValue label={labels.emergencyContactName} value={employee.emergencyContactName} />
                    <LabelValue label={labels.emergencyContactPhone} value={employee.emergencyContactPhone} />
                    <LabelValue label={labels.emergencyContactRelation} value={employee.emergencyContactRelation} />
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                    <LabelValue label={labels.address} value={employee.address} />
                    <LabelValue label={labels.postalCode} value={employee.postalCode} />
                    <LabelValue label={labels.city} value={employee.city} />
                </div>
                <br/>
                <div className="mdl-cell mdl-cell--3-col">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent form-element"
                            onClick={this.editView}>
                        Endre
                    </button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored form-element"
                            onClick={this.closeView}>
                        Lukk
                    </button>
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
        return (
            <div className="data-group">
                <label className="data-label">
                    {this.props.label}
                </label>
                <div className='data-value'>
                    {this.props.value}
                </div>
            </div>
        );
    }
});

module.exports = ViewEmployee;
