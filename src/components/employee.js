import React from 'react';
import { browserHistory } from 'react-router';
import md5 from 'md5';

import Spinner from './spinner';

const IconAndText = ({ icon, textLines }) => (
  <div className='icon-row'>
    <div className='icon-row-icon'>
      <i className='material-icons main-color'>{icon}</i>
    </div>
    <div>
      {textLines.map(line => <div key={line}>{line}</div>)}
    </div>
  </div>
);

IconAndText.propTypes = {
  icon: React.PropTypes.string.isRequired,
  textLines: React.PropTypes.array.isRequired
};

const Employee = (props) => {
  if (props.employee.loading) {
    return (
      <Spinner />
    );
  } else if (props.employee.data === null) {
    return (
      <div>
        Not found...
      </div>
    );
  }

  const employee = props.employee.data;

  return (
    <div className='floq-details-sticky'>
      <div className='employee-image'>
        <img
          className='profile-pic'
          src={`https://www.gravatar.com/avatar/${md5(employee.email)}`}
          alt={employee.first_name}
        />
      </div>
      <div className='employee-name'>
        <h5>{employee.first_name} {employee.last_name}</h5>
        <span className='gray'>{employee.title}</span>
      </div>

      <div>
        <IconAndText
          icon='phone'
          textLines={[<a id='phone-number' href={`tel:${employee.phone}`}>{employee.phone}</a>]}
        />
      </div>
      <div>
        <IconAndText icon='email' textLines={[employee.email]} />
      </div>
      <div>
        <IconAndText
          icon='location_on'
          textLines={[employee.address, `${employee.postal_code} ${employee.city}`]}
        />
      </div>
      <div>
        <div className='icon-row'>
          <div className='icon-row-icon'>
          </div>
          <div>
            <h3>Kontaktperson</h3>
            <span className='emergency-contact'>{employee.emergency_contact_name}</span>
            <br />
            <span className='emergency-contact gray'>{employee.emergency_contact_relation}</span>
            <br />
            <span className='emergency-contact'>{employee.emergency_contact_phone}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => browserHistory.push(`/employees/edit/${employee.id}`)}
        className='edit-employee mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
      >
        <i className='material-icons dark-gray'>create</i>
      </button>
    </div>
  );
};

Employee.propTypes = {
  employee: React.PropTypes.object
};

export default Employee;
