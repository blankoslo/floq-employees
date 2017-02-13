import React from 'react';
import EmployeeImage from './employeeImage';
import Spinner from './spinner';

const IconAndText = ({ icon, textLines }) => (
  <div className='icon-row'>
    <div className='icon-row-icon'>
      <i className='material-icons main-color'>{icon}</i>
    </div>
    <div>
      {textLines.map(line => <div className='floq-card-icon-and-text' key={line}>{line}</div>)}
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

  const employee = props.employee;

  return (
    <div className='floq-card mdl-card mdl-shadow--4dp'>
      <div className='mdl-card__media'>
        <EmployeeImage
          className='cavd-pic'
          src={employee.image_url}
          width='256'
          height='200'
        />
      </div>
      <div className='mdl-card__title floq-card-title'>
        <div>
          <h1 className='mdl-card__title-text floq-card-name'>
            {employee.first_name} {employee.last_name}
          </h1>
        </div>
        <div>
          <h3 className='gray'>{employee.title}</h3>
        </div>
      </div>
      <div className='mdl-card__supporting-text floq-card-text'>
        <IconAndText
          icon='phone'
          textLines={[<a id='phone-number' href={`tel:${employee.phone}`}>{employee.phone}</a>]}
        />
        <IconAndText
          icon='email'
          textLines={[<a id='email-address' href={`mailto:${employee.email}`}>{employee.email}</a>]}
        />
        <IconAndText
          icon='location_on'
          textLines={[employee.address, `${employee.postal_code} ${employee.city}`]}
        />
        <IconAndText icon='date_range' textLines={[employee.birth_date]} />
        <h1 className='mdl-card__title-text floq-card-contact-title'>
          Kontaktperson
        </h1>
        <h3 className='black floq-card-contact'>{employee.emergency_contact_name}</h3>
        <h3 className='gray floq-card-contact'>
          {employee.emergency_contact_relation}
        </h3>
        <a id='phone-number' href={`tel:${employee.emergency_contact_phone}`}>
          {employee.emergency_contact_phone}
        </a>
      </div>
      <div className='edit-click mdl-card__menu'>
        <button
          className='edit-employee mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
          onClick={props.onEdit}
        >
          <i className='material-icons white'>create</i>
        </button>
      </div>
    </div>
  );
};

Employee.propTypes = {
  employee: React.PropTypes.object,
  onEdit: React.PropTypes.func
};

export default Employee;
