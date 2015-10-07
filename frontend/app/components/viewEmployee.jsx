var React = require('react');
var Fluxxor = require('fluxxor');

var EmployeeStore = require('./../stores/EmployeeStore');
var Constants = require('./../constants.js');
var Record = require ('./../record.js');
var EmployeeForm = require('./employeeForm.jsx');


var ViewEmployee = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('EmployeeStore')
    ],

    getStateFromFlux() {
        var employeeStore = this.getFlux().store('EmployeeStore');
        console.log(this.props.params.id);

        return {
            employeeStore: employeeStore
        };
    },

    getInitialState() {
        return {
            errors: {}
        };
    },




    render: function () {
        var employee = this.state.employeeStore.getEmployee(this.props.params.id);


        return <div className="formContainer">
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
                    <span>{employee.emergencyContactName}</span>
                    <span>{employee.emergencyContactPhone}</span>
                    <span>{employee.emergencyContactRelation}</span>
                </div>
                <div className="form-row">
                    <span>{employee.address}</span>
                    <span>{employee.postalCode}</span>
                    <span>{employee.city}</span>
                </div>
             </div>
    }
});

var LabelValue = React.createClass({

    render() {
        return <div className="form-group"><label className="control-label">{this.props.label}</label><span>{this.props.value}</span></div>
    }


});

module.exports = ViewEmployee;
