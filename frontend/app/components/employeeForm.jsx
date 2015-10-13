var React = require('react');
var Fluxxor = require('fluxxor');

var Record = require ('./../record.js');
var TextField = require('./formItems/textField.jsx');
var SelectField = require('./formItems/selectField.jsx');
var DateField = require('./formItems/dateField.jsx');

var EmployeeForm = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('GenderStore', 'UserStore')
    ],

    getStateFromFlux() {
        var genderStore = this.getFlux().store('GenderStore');
        return {
            genders: genderStore.genders

        };
    },

    getInitialState(){
      return {
          errors: {},
          employee: this.props.initialEmployee
      }
    },

    handleChange: function (event) {
        var newEmployee = this.state.employee.set(event.target.name, event.target.value)
        this.setState({employee: newEmployee})
    },

    handleSubmit(event) {
        event.preventDefault();

        if(this.requiredFieldsAreOk()){
            this.props.onSubmit(event, this.state.employee);
        }
    },

    requiredFieldsAreOk: function () {
        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        var requiredFields = ['firstName', 'lastName', 'phone', 'gender', 'birthDate', 'email'];
        var that = this;
        var errors = {};
        requiredFields.forEach( function (requiredField) {
            var value = that.state.employee[requiredField];
            if (!value || (String(value).trim() === '')) {
                errors[requiredField] = 'This field is required';
            }
        });

        this.props.setErrors(errors);

        return isEmpty(errors);
    },

    handleChangeDate: function (date, id) {
        var newEmployee = this.state.employee.set(id, date.format('YYYY-MM-DD'));
        this.setState({employee: newEmployee});
    },

    render: function () {
        var options = this.state.genders.toJS();

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <TextField id="firstName" label="Fornavn" value={this.state.employee.firstName} handleChange={this.handleChange} error={this.state.errors['firstName']} />
                    <TextField id="lastName" label="Etternavn" value={this.state.employee.lastName} handleChange={this.handleChange} error={this.state.errors['lastName']} />
                    <TextField id="phone" label="Telefon" value={this.state.employee.phone} handleChange={this.handleChange} error={this.state.errors['phone']}/>
                    <TextField id="email" label="Epost" value={this.state.employee.email} handleChange={this.handleChange} error={this.state.errors['email']}/>
                </div>
                <div className="form-row">
                    <SelectField id="gender" label="Kjønn" value={this.state.employee.gender} options={options} handleChange={this.handleChange} error={this.state.errors['gender']}/>
                    <DateField id="birthDate" label="Fødselsdato" value={this.state.employee.birthDate} handleChange={this.handleChangeDate} error={this.state.errors['birthDate']}/>
                    <DateField id="dateOfEmployment" label="Ansettelsesdato" value={this.state.employee.dateOfEmployment} handleChange={this.handleChangeDate} />
                </div>
                <div className="form-row">
                    <TextField id="emergencyContactName" label="Nærmeste pårørende" value={this.state.employee.emergencyContactName} handleChange={this.handleChange} />
                    <TextField id="emergencyContactPhone" label="Pårørende telefon" value={this.state.employee.emergencyContactPhone} handleChange={this.handleChange} />
                    <TextField id="emergencyContactRelation" label="Pårørende relasjon" value={this.state.employee.emergencyContactRelation} handleChange={this.handleChange} />
                </div>
                <div className="form-row">
                    <TextField id="address" label="Adresse" value={this.state.employee.address} handleChange={this.handleChange} />
                    <TextField id="postalCode" label="Postnummer" value={this.state.employee.postalCode} handleChange={this.handleChange} />
                    <TextField id="city" label="By" value={this.state.employee.city} handleChange={this.handleChange} />
                </div>
                <button type="submit" value="Submit">Lagre</button> <button onClick={this.props.onCancel}>Avbryt</button>
            </form>
        );
    }
});

module.exports = EmployeeForm;
