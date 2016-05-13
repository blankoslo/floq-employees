import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
      <EmployeeRow key={`employee-${employee.id}`} employee={employee} />
    );

    return (
      <div>
        <div className='demo-list-action mdl-list'>
          <div className='employee-list-header'>
            <div>
              <h3>Alle ansatte</h3>
            </div>
            <button
              onClick={() => browserHistory.push('/employees/new')}
              id='add-employee-button'
              className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
            >
              <i className='material-icons dark-gray'>add</i>
            </button>
          </div>
          <hr />
          <div className='vert-spacer' />
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
