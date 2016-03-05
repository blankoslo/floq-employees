import React, {Component} from 'react';
import { Link } from 'react-router';

export default class EmployeeRow extends Component {
    render() {
        var employee = this.props.employee;

        return (
            <div className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                    <span>{employee.first_name} {employee.last_name}</span>
                    <div className="mdl-layout-spacer"></div>
                    <i className="material-icons mdl-list__item-avatar">person</i>
                </span>
            </div>
        );
    }
}
