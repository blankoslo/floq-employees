var React = require('react');
var Fluxxor = require('fluxxor');
import { Link } from 'react-router';

var Constants = require('../constants.js');
let labels = Constants.ATTR_LABELS;
let headers = ['firstName', 'lastName', 'phone', 'address', 'postalCode',
    'city', 'dateOfEmployment', 'edit']
    .map(name =>
        <th key={`header-${name}`} className='mdl-data-table__cell--non-numeric'>
            {labels[name]}
        </th>
    );

var EmployeeRow = require('./employeeRow.jsx');

var EmployeeList = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('EmployeeStore')
    ],

    getStateFromFlux() {
        var employees = this.getFlux().store('EmployeeStore').employees
                .sort((a, b) => a.firstName > b.firstName);

        return {employees};
    },

    render() {
        var employees = this.state.employees.toJS();
        var rows = employees.map(employee =>
            <EmployeeRow key={`employee-${employee.id}`} employee={employee}/>
        );

        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col content-box">
                    <h4>Ansatte</h4>
                    {rows.length > 0 ?
                        <table className="mdl-data-table mdl-js-data-table full-width">
                            <thead>
                                <tr>{headers}</tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        : null
                    }
                    <br/>
                    <Link to='/employees/new' className='mdl-button mdl-js-button mdl-button--fab mdl-button--colored'>
                        <i className='material-icons'>add</i>
                    </Link>
                </div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = EmployeeList;
