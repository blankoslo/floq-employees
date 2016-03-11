// @flow

import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import md5 from 'md5';

import { selectEmployee } from '../actions/index';

export type Employee = {
    id : number,
    first_name : string,
    last_name : string,
    title : string,
    phone : string,
    email : string,
    gender : string,
    birth_date : string,
    date_of_employment : string,
    termination_date : string,
    emergency_contact_name : string,
    emergency_contact_phone : string,
    emergency_contact_relation : string,
    address : string,
    postal_code : string,
    city : string
};

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
        src={`http://www.gravatar.com/avatar/${md5(props.employee.email)}`}
      />
    </span>
  </div>
);

EmployeeRow.propTypes = {
  employee: React.PropTypes.object.isRequired
};

export default connect(null, { selectEmployee })(EmployeeRow);
