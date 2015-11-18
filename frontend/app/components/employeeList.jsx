var React = require('react');
var Fluxxor = require('fluxxor');
var Reactable = require('reactable');
var Router = require('react-router');
var Link = Router.Link;
var Table = Reactable.Table, Tr = Reactable.Tr, Td = Reactable.Td;

var Constants = require('../constants.js');
let labels = Constants.ATTR_LABELS;
let columns = ['firstName', 'lastName', 'phone', 'address', 'postalCode',
    'city', 'dateOfEmployment', 'edit']
    .map(function(name) {
            return {key: name, label: labels[name]};
    });

var EmployeeList = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('EmployeeStore', 'UserStore')
    ],

    getStateFromFlux() {
        var employeeStore = this.getFlux().store('EmployeeStore');
        var userStore = this.getFlux().store('UserStore');
        return {
            employees: employeeStore.employees,
            loggedInUser: userStore.loggedInUser
        };
    },

    render() {
        var employees = this.state.employees.toJS();
        var rows = employees.map(employee => <Tr key={'key'+employee.id} data={employee}><Td column="edit"><Link to={`/employee/${employee.id}`}>Vis</Link></Td></Tr>);

        return (
            <div className="employeelist">
                {this.props.children}
                <Table id="employeetable" columns={columns} sortable={true} defaultSort={{column: 'firstName', direction: 'asc'}}>{rows}</Table>
                {rows}
            </div>
        );
    }
});

module.exports = EmployeeList;
