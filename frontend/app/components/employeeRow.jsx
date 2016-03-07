var React = require('react');
var moment = require('moment');
import { Link } from 'react-router';

var EmployeeRow = React.createClass({
    render() {
        var employee = this.props.employee;
        return (
            <tr>
                <td className='mdl-data-table__cell--non-numeric'>{employee.firstName}</td>
                <td className='mdl-data-table__cell--non-numeric'>{employee.lastName}</td>
                <td className='mdl-data-table__cell--non-numeric'>{employee.phone}</td>
                <td className='mdl-data-table__cell--non-numeric'>{employee.address}</td>
                <td className='mdl-data-table__cell--non-numeric'>{employee.postalCode}</td>
                <td className='mdl-data-table__cell--non-numeric'>{employee.city}</td>
                <td className='mdl-data-table__cell--non-numeric'>{employee.dateOfEmployment}</td>
                <td className='icon-cell'>
                    <Link to={`/employees/${employee.id}`} className='mdl-button mdl-js-button mdl-button--icon'>
                        <i className='material-icons'>keyboard_arrow_right</i>
                    </Link>
                </td>
            </tr>
        );
    }
});

module.exports = EmployeeRow;
