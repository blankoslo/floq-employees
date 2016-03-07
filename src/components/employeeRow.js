// @flow

import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import md5 from 'md5';

type Employee = {id : number, first_name : string, last_name : string};

const EmployeeRow = (props : {employee: Employee}) => {
  const employee = props.employee;

  return (
    <div className="mdl-list__item" onClick={() => browserHistory.push(`/employees/${employee.id}`)}>
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
