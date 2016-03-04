import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getEmployees} from '../actions/index';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.getEmployees();
    }

    renderList() {
        return this.props.employees.map(employee => {
            return <li key={employee.id}>{employee.first_name}</li>;
        });
    }

    render() {
        if (this.props.employees === null) {
            return <div>Loading…</div>;
        }

        return (
            <div>
                <ul>
                    {this.renderList()}
                </ul>
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
