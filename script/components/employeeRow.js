// @flow

import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import md5 from 'md5';

import { selectEmployee } from '../actions/index';

const setCurrentEmployee = (id) => {
  browserHistory.push(`/employees/${id}`);
};

const EmployeeRow = (props) => (
  <div
    className='mdl-list__item employee-list-row'
    onClick={setCurrentEmployee.bind(this, props.employee.id)}
  >
    <span className='mdl-list__item-primary-content'>
      <span>{props.employee.first_name} {props.employee.last_name}</span>
      <div className='mdl-layout-spacer'></div>
      <img className='employee-list-image'
        src={`https://www.gravatar.com/avatar/${md5(props.employee.email)}`}
      />
    </span>
  </div>
);

EmployeeRow.propTypes = {
  employee: React.PropTypes.object.isRequired
};

export default connect(null, { selectEmployee })(EmployeeRow);
