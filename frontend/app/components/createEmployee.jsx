var React = require('react');
var Fluxxor = require('fluxxor');
var Reactable = require('reactable');

var Table = Reactable.Table, Tr = Reactable.Tr;

var Record = require ('./../record.js')
var TextField = require('./formItems/textField.jsx');
var SelectField = require('./formItems/selectField.jsx');
var DateField = require('./formItems/dateField.jsx');


var CreateEmployee = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('GenderStore')
    ],

    componentDidMount() {
        this.getFlux().actions.loadGenders();
    },

    getStateFromFlux() {
        var genderStore = this.getFlux().store('GenderStore');
        return {
            genders: genderStore.genders,
            employee: new Record.Employee()
        };
    },

    handleSubmit(event) {
        event.preventDefault();

        this.getFlux().actions.createEmployee(this.state.employee);

    },

    handleChange: function (event) {
        console.log(event.target.name);
        console.log(event.target.value);

        var newEmployee = this.state.employee.set(event.target.name, event.target.value)

        console.log("event: " + event.target);

        this.setState({employee: newEmployee})

        console.log(newEmployee.toJS());

        //var newState = {};
        //newState[event.target.name] = event.target.value;
        //this.setState(newState);
    },

    handleChangeDate: function (date, id) {
        console.log(id);
        console.log(date);

        var newEmployee = this.state.employee.set(id, date.format('YYYY-MM-DD'));
        this.setState({employee: newEmployee});
    },

    render: function () {
        console.log(this.state.genders);
        var options = this.state.genders.toJS();

        return (
            <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <TextField id="firstName" label="Fornavn" value={this.state.employee.firstName} handleChange={this.handleChange} />
                    <TextField id="lastName" label="Etternavn" value={this.state.employee.lastName} handleChange={this.handleChange} />
                    <TextField id="phone" label="Telefon" value={this.state.employee.phone} handleChange={this.handleChange} />
                    <SelectField id="gender" label="Kjønn" value={this.state.employee.gender} options={options} handleChange={this.handleChange}/>
                    <DateField id="birthDate" label="Fødselsdato" value={this.state.employee.birthDate} handleChange={this.handleChangeDate} />
                    <DateField id="dateOfEmployment" label="Ansettelsesdato" value={this.state.employee.dateOfEmployment} handleChange={this.handleChangeDate} />
                    <TextField id="emergencyContactName" label="Nærmeste pårørende" value={this.state.employee.emergencyContactName} handleChange={this.handleChange} />
                    <TextField id="emergencyContactPhone" label="Pårørende telefon" value={this.state.employee.emergencyContactPhone} handleChange={this.handleChange} />
                    <TextField id="emergencyContactRelation" label="Pårørende relasjon" value={this.state.employee.emergencyContactRelation} handleChange={this.handleChange} />
                    <TextField id="address" label="Adresse" value={this.state.employee.address} handleChange={this.handleChange} />
                    <TextField id="postalCode" label="Postnummer" value={this.state.employee.postalCode} handleChange={this.handleChange} />
                    <TextField id="city" label="By" value={this.state.employee.city} handleChange={this.handleChange} />
                    <button type="submit" value="Submit">Lagre</button>
                </form>
            </div>
        );
    }
});


//birthDate: null,
//    dateOfEmployment: null, terminationDate: null, emergencyContactName: null, emergencyContactPhone: null,
//    address: null, postalCode: null, city: null


module.exports = CreateEmployee;
