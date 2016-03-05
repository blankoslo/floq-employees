import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getEmployees} from '../actions/index';
import EmployeeRow from './employeeRow';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.getEmployees();
    }

    render() {
        if (this.props.employees === null) {
            return (
                <div style={{
                        width: '100%',
                        margin: '15px',
                        textAlign: 'center'
                    }}>
                    <div className="mdl-spinner mdl-js-spinner is-active" />
                </div>
            );
        }

        var employeeRows = this.props.employees.map(employee =>
            <EmployeeRow key={`employee-${employee.id}`} employee={employee}/>
        );

        return (
            <div className="demo-list-action mdl-list">
                {employeeRows}
            </div>
        );
    }
}

const mapStateToProps = ({employees}) => {
    return {
        employees: employees
    };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getEmployees}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
