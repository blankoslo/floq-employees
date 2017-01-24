import React from 'react';
import { browserHistory } from 'react-router';
import EmployeeImage from './employeeImage';

const EmployeeRow = (props) => (
  <div
    className='floq-list-row'
    onClick={() => browserHistory.push(`/employees/${props.employee.id}`)}
  >
    <EmployeeImage
      className='employee-list-image'
      src={props.employee.image_url}
      width='40'
      height='40'
    />
    <span>{props.employee.first_name} {props.employee.last_name}</span>
  </div>
);

EmployeeRow.propTypes = {
  employee: React.PropTypes.object.isRequired
};

export default EmployeeRow;
