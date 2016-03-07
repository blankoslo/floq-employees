// @flow

import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import md5 from 'md5';

type Employee = {
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

const EmployeeRow = (props : {employee: Employee}) => {
  const employee = props.employee;

  return (
    <div
      className="mdl-list__item"
      style={{borderTop: '1px solid #E0E0E0'}}
      onClick={() => browserHistory.push(`/employees/${employee.id}`)}>
      <span className="mdl-list__item-primary-content">
        <span>{employee.first_name} {employee.last_name}</span>
        <div className="mdl-layout-spacer"></div>
        <img style={{
            width: '40px',
            height: '40px',
            borderRadius: '20px'
          }}
          src={`http://www.gravatar.com/avatar/${md5(employee.email)}`} />
      </span>
    </div>
  );
};

EmployeeRow.propTypes = {
  employee: PropTypes.object.isRequired
};

export default EmployeeRow;
