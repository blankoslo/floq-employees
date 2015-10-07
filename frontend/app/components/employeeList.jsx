var React = require('react');
var Fluxxor = require('fluxxor');
var Reactable = require('reactable');
var Router = require('react-router');
var Link = Router.Link;
var Table = Reactable.Table, Tr = Reactable.Tr, Td = Reactable.Td;

var EmployeeList = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('EmployeeStore', 'UserStore')
    ],

    componentDidMount() {
        if(this.state.loggedInUser.token) this.getFlux().actions.loadEmployees(this.state.loggedInUser.token);
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

        var rows = employees.map(employee => <Tr data={employee}><Td column="edit"><Link to="employee" params={{id: employee.id}}>Detaljer</Link></Td></Tr>);


        var columns = [{key: 'firstName', label: 'Fornavn'}, {key: 'lastName', label: 'Etternavn'}, {key: 'phone', label:'Telefon'},
            {key: 'address', label: 'Adresse'}, {key: 'postalCode', label: 'Postnr.'}, {key: 'city', label: 'By'}, {key: 'dateOfEmployment', label: 'Startdato'},
            {key:"edit", label: "Endre"}];

        return (
            <div>
            <Table className="table" columns={columns} sortable={true} defaultSort={{column: 'firstName', direction: 'desc'}}>{rows}</Table>
                {rows}
                </div>
        );
    }
});

module.exports = EmployeeList;
