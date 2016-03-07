
import React, { PropTypes } from 'react';


const EmployeeRow = (props) => {
  const employee = props.employee;

  return (
    <div className="mdl-list__item">
      <span className="mdl-list__item-primary-content">
        <span>{employee.first_name} {employee.last_name}</span>
        <div className="mdl-layout-spacer"></div>
        <i className="material-icons mdl-list__item-avatar">person</i>
      </span>
    </div>
  );
};

EmployeeRow.propTypes = {
  employee: PropTypes.object.isRequired
};

export default EmployeeRow;
