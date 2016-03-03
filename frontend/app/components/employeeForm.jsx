var React = require('react');
var Fluxxor = require('fluxxor');
var moment = require('moment');

var Record = require ('./../record.js');
var TextField = require('./formItems/textField.jsx');
var DateField = require('./formItems/dateField.jsx');
var SelectField = require('./formItems/selectField.jsx');
var RadioButtonField = require('./formItems/radioButtonField.jsx');
var FormField = require('./formItems/formField.jsx');

var Constants = require('../constants.js');
let labels = Constants.ATTR_LABELS;

var EmployeeForm = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('GenderStore')
    ],

    componentDidMount() {
        componentHandler.upgradeDom();
    },

    componentDidUpdate() {
        componentHandler.upgradeDom();
    },

    getStateFromFlux() {
        var genderStore = this.getFlux().store('GenderStore');
        return {
            genders: genderStore.genders
        };
    },

    getInitialState() {
      return {
          errors: {},
          employee: this.props.initialEmployee
      }
    },

    handleChange(event) {
        var newEmployee = this.state.employee.set(event.target.name, event.target.value);
        this.setState({employee: newEmployee})
    },

    handleCancel(event) {
        this.props.onCancel(event, this.state.employee);
    },

    handleSubmit(event) {
        event.preventDefault();

        if (this.requiredFieldsAreOk()) {
            this.props.onSubmit(event, this.state.employee);
        }
    },

    requiredFieldsAreOk() {
        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        var requiredFields = ['firstName', 'lastName', 'phone', 'gender', 'birthDate', 'email'];
        var that = this;
        var errors = {};
        requiredFields.forEach(function(requiredField) {
            var value = that.state.employee[requiredField];
            if (!value || (String(value).trim() === '')) {
                errors[requiredField] = 'This field is required';
            }
        });

        this.props.setErrors(errors);

        return isEmpty(errors);
    },

    handleChangeDate(event) {
        var id = event.target.name;
        var date = event.target.value;

        if(moment(date, 'DD/MM/YYYY').isValid()){
            var newEmployee = this.state.employee.set(id, date);
            this.setState({employee: newEmployee});
        }
        else {
            var errors = {};
            errors[id] = 'Not a valid date';
            console.log('wroong date' + id)
            this.props.setErrors(errors);
        }

    },

    render() {
        var options = this.state.genders.map(o => Record.Gender({name: labels[o.name], value: o.value}));

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                        <TextField id="firstName" label={labels.firstName} value={this.state.employee.firstName} handleChange={this.handleChange} error={this.state.errors['firstName']} required={true}/>
                        <TextField id="lastName" label={labels.lastName} value={this.state.employee.lastName} handleChange={this.handleChange} error={this.state.errors['lastName']} required={true}/>
                        <TextField id="phone" label={labels.phone} value={this.state.employee.phone} handleChange={this.handleChange} error={this.state.errors['phone']} required={true}/>
                        <TextField id="email" label={labels.email} value={this.state.employee.email} handleChange={this.handleChange} error={this.state.errors['email']} required={true}/>
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                        <DateField id="birthDate" label={"24/12/1984 (" +labels.birthDate + ")"} value={this.state.employee.birthDate} handleChange={this.handleChangeDate} error={this.state.errors['birthDate']} required={true} />
                        <DateField id="dateOfEmployment" label={"21/10/2015 (" + labels.dateOfEmployment + ")"} value={this.state.employee.dateOfEmployment} handleChange={this.handleChangeDate} required={true} />
                        <RadioButtonField id="gender" label={labels.gender} value={this.state.employee.gender} options={options} handleChange={this.handleChange} error={this.state.errors['gender']} required={true}/>
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                        <TextField id="address" label={labels.address} value={this.state.employee.address} handleChange={this.handleChange} />
                        <TextField id="postalCode" label={labels.postalCode} value={this.state.employee.postalCode} handleChange={this.handleChange} />
                        <TextField id="city" label={labels.city} value={this.state.employee.city} handleChange={this.handleChange} />
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                        <TextField id="emergencyContactName" label={labels.emergencyContactName} value={this.state.employee.emergencyContactName} handleChange={this.handleChange} />
                        <TextField id="emergencyContactPhone" label={labels.emergencyContactPhone} value={this.state.employee.emergencyContactPhone} handleChange={this.handleChange} />
                        <TextField id="emergencyContactRelation" label={labels.emergencyContactRelation} value={this.state.employee.emergencyContactRelation} handleChange={this.handleChange} />
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                        <button type="submit"
                                value="Submit"
                                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent form-element">
                            Lagre
                        </button>
                        <button onClick={this.handleCancel}
                                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored form-element">
                            Lukk
                        </button>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = EmployeeForm;
