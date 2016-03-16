// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../actions/index';

import EmployeeRow from './employeeRow';
import Spinner from './spinner';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.getEmployees();
  }

  render() {
    if (this.props.employees === null) {
      return <Spinner />;
    }

    const employeeRows = this.props.employees.map(employee =>
      <EmployeeRow key={`employee-${employee.id}`} employee={ employee } />
    );

    return (
      <div>
        <div className='demo-list-action mdl-list'>
          <h4>Alle ansatte</h4>
          {employeeRows}
        </div>
      </div>
    );
  }
}

EmployeeList.propTypes = {
  employees: React.PropTypes.array,
  getEmployees: React.PropTypes.func
};

const mapStateToProps = ({ employees }) => ({
  employees
});

export default connect(mapStateToProps, { getEmployees })(EmployeeList);
