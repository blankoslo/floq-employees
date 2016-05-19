import React from 'react';
import { browserHistory } from 'react-router';
import md5 from 'md5';

const gridClasses = 'mdl-cell mdl-cell--6-col mdl-cell--3-offset-desktop mdl-cell--12-col-phone';
const cellClasses = 'mdl-cell mdl-cell--8-col mdl-cell--4-offset-desktop mdl-cell--4-col-phone';

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

const viewEmployee = ({ employee }) => {
  if (employee === null) {
    return (
      <div>
        Not found.
      </div>
    );
  }

  return (
    <div className='mdl-grid'>
      <div className={`${cellClasses} center-text`}>
      </div>
      <div className={`${cellClasses} center-text`}>
        <img
          className='profile-pic'
          src={`https://www.gravatar.com/avatar/${md5(employee.email)}`}
          alt='{employee.first_name}'
        />
      </div>
      <div className={`${cellClasses} center-text`}>
        <h5>{employee.first_name} {employee.last_name}</h5>
        <span className='gray'>{employee.title}</span>
      </div>
      <div className='vert-spacer' />
      <div className={gridClasses}>
        <IconAndText icon='phone' textLines={[employee.phone]} />
      </div>
      <div className={gridClasses}>
        <IconAndText icon='email' textLines={[employee.email]} />
      </div>
      <div className={gridClasses}>
        <IconAndText
          icon='location_on'
          textLines={[employee.address, `${employee.postal_code} ${employee.city}`]}
        />
      </div>
      <div className='mdl-cell mdl-cell--9-col mdl-cell--3-offset-desktop mdl-cell--12-col-phone'>
        <hr className='icon-margin' />
      </div>
      <div className={gridClasses}>
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
        onClick={() => browserHistory.push(`/employees/${employee.id}/edit`)}
        className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
      >
        <i className='material-icons dark-gray'>create</i>
      </button>
    </div>
  );
};

viewEmployee.propTypes = {
  employee: React.PropTypes.object
};

export default viewEmployee;
