var React = require('react');
var Fluxxor = require('fluxxor');
var Reactable = require('reactable');

var Table = Reactable.Table, Tr = Reactable.Tr;

var EmployeeList = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('EmployeeStore', 'UserStore')
    ],

    componentDidMount() {
        this.getFlux().actions.loadEmployees(this.state.loggedInUser.token);
    },

    getStateFromFlux() {
        var employeeStore = this.getFlux().store('EmployeeStore');
        var userStore = this.getFlux().store('UserStore');
        return {
            employees: employeeStore.employees,
            loggedInUser: userStore.loggedInUser
        };
    },

    render: function () {
        var employees = this.state.employees.toJS();
        var columns = [{key: 'firstName', label: 'Fornavn'}, {key: 'lastName', label: 'Etternavn'}, {key: 'phone', label:'Telefon'},
            {key: 'address', label: 'Adresse'}, {key: 'postalCode', label: 'Postnr.'}, {key: 'city', label: 'By'}, {key: 'dateOfEmployment', label: 'Startdato'}];

        return (
            <div>
            <Table className="table" data={employees} columns={columns} sortable={true} defaultSort={{column: 'firstName', direction: 'desc'}}/>
                </div>
        );
    }
});

module.exports = EmployeeList;
