// @flow

import React from 'react';
import { Link } from 'react-router';
import md5 from 'md5';

const gridClasses = 'mdl-cell mdl-cell--6-col mdl-cell--3-offset-desktop mdl-cell--12-col-phone';
const cellClasses = 'mdl-cell mdl-cell--8-col mdl-cell--4-offset-desktop mdl-cell--4-col-phone';

const IconAndText = ({icon, text}) => (
  <div style={{display: "flex", flexFlow: "row"}}>
    <div style={{margin: "0 10px"}}>
      <i className='material-icons main-color'>{icon}</i>
    </div>
    <div>
      {text.map(line => <div>{line}</div>)}
    </div>
  </div>
);

const viewEmployee = ({ employee }) => (
  <div className='mdl-grid'>
    <div className={`${cellClasses} center-text`}>
      <Link to={`/employees/${employee.id}/edit`}>Edit</Link>
    </div>
    <div className={`${cellClasses} center-text`}>
      <img className='profile-pic'
        src={`https://www.gravatar.com/avatar/${md5(employee.email)}`}
      />
    </div>
    <div className={`${cellClasses} center-text`}>
      <h5>{employee.first_name} {employee.last_name}</h5>
      <span className='gray'>{employee.title}</span>
    </div>
    <div className={cellClasses}>
      <hr />
    </div>
    <div className={gridClasses}>
      <IconAndText icon="phone" text={[employee.phone]} />
    </div>
    <div className={gridClasses}>
      <IconAndText icon="email" text={[employee.email]} />
    </div>
    <div className={gridClasses}>
      <IconAndText
          icon="location_on"
          text={[employee.address, employee.postal_code + ' ' + employee.city]} />
    </div>
    <div className={cellClasses}>
      <hr />
    </div>
    <div className={cellClasses}>
      <h5>Kontaktperson</h5>
    </div>
    <div className={cellClasses}>
      <p className='emergency-contact'>{employee.emergency_contact_name}</p>
      <p className='emergency-contact gray'>{employee.emergency_contact_relation}</p>
      <p className='emergency-contact'>{employee.emergency_contact_phone}</p>
    </div>
  </div>
);

viewEmployee.propTypes = {
  employee: React.PropTypes.object.isRequired
};

export default viewEmployee;
