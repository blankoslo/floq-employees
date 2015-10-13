var React = require('react');
var Fluxxor = require('fluxxor');

var EmployeeStore = require('./../stores/EmployeeStore');
var Constants = require('./../constants.js');
var Record = require ('./../record.js');
var EmployeeForm = require('./employeeForm.jsx');
import { History } from 'react-router'

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

    render: function () {
        var employee = this.state.employeeStore.getEmployee(this.props.params.id);
        var partial;

        if(employee){

            partial = <div className="formContainer">
                <button className="closeButton" onClick={this.closeView}>X</button><br/>
                <button className="closeButton" onClick={this.editView}>Endre</button>
                <div className="form-row">
                    <LabelValue label="Fornavn" value={employee.firstName} />
                    <LabelValue label="Etternavn" value={employee.lastName} />
                    <LabelValue label="Telefon" value={employee.phone} />
                    <LabelValue label="E-post" value={employee.email} />

                </div>
                <div className="form-row">
                    <LabelValue label="Kjønn" value={employee.gender} />
                    <LabelValue label="Fødselsdato" value={employee.birthDate} />
                    <LabelValue label="Ansettelsesdato" value={employee.dateOfEmployment} />
                </div>
                <div className="form-row">
                    <LabelValue label="Kontaktperson" value={employee.emergencyContactName} />
                    <LabelValue label="Kontaktperson, telefon" value={employee.emergencyContactPhone} />
                    <LabelValue label="Kontaktperson, relasjon" value={employee.emergencyContactRelation} />
                </div>
                <div className="form-row">
                    <LabelValue label="Adresse" value={employee.address} />
                    <LabelValue label="Postnr." value={employee.postalCode} />
                    <LabelValue label="Sted" value={employee.city} />
                </div>
            </div>
        }
        else {
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
