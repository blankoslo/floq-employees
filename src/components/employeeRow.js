import React from 'react';
import { browserHistory } from 'react-router';
import md5 from 'md5';

const EmployeeRow = (props) => (
  <div
    className='floq-list-row'
    onClick={() => browserHistory.push(`/employees/${props.employee.id}`)}
  >
    <img
      className='employee-list-image'
      src={`https://www.gravatar.com/avatar/${md5(props.employee.email)}`}
      alt={props.employee.first_name}
    />
    <span>{props.employee.first_name} {props.employee.last_name}</span>
  </div>
);

EmployeeRow.propTypes = {
  employee: React.PropTypes.object.isRequired
};

export default EmployeeRow;
