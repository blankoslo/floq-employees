// @flow

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EmployeeRow from './employeeRow';

class EmployeeList extends Component {
  render() {
    const employeeRows = this.props.employees.map(employee =>
      <EmployeeRow key={`employee-${employee.id}`} employee={ employee }/>
    );

    const list = (
      <div>
        <div className="demo-list-action mdl-list">
          <h4>Alle ansatte</h4>
          {employeeRows}
        </div>
      </div>
    );

    const listClasses = this.props.children === null
      ? "mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet"
      : "mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--hide-phone";

    return (
      <div className="mdl-grid">
        <div className={listClasses}>
          {list}
        </div>
        <div className="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet">
          <div className="detail-view">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

EmployeeList.propTypes = {
};

const mapStateToProps = ({ employees }) => ({
  employees: employees
});

export default connect(mapStateToProps)(EmployeeList);
