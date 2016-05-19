import React from 'react';

import { isLoading, getValue } from '../loading';
import TextField from './formItems/textField';
import DateField from './formItems/dateField';
import SelectField from './formItems/selectField';
import { employeeFormLabels as labels, formLabels } from '../strings';

const buttonClasses = 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored';

const EmployeeForm = (props) => {
  if (isLoading(props.employee)) {
    return null;
  } else if (getValue(props.employee) === null) {
    return (
      <div>
        Not found.
      </div>
    );
  }

  const employee = getValue(props.employee);

  return (
    <form onSubmit={props.onSubmit}>
      <TextField
        value={employee.first_name}
        label={labels.no.first_name}
        onChange={props.onChange}
        fieldName='first_name'
        pattern='.+'
      />
      <TextField
        value={employee.last_name}
        label={labels.no.last_name}
        onChange={props.onChange}
        fieldName='last_name'
        pattern='.+'
      />
      <TextField
        value={employee.title}
        label={labels.no.title}
        onChange={props.onChange}
        fieldName='title'
        pattern='.+'
      />
      <SelectField
        choices={['female', 'male', 'other']}
        labels={labels.no}
        value={employee.gender}
        onChange={props.onChange}
        fieldName='gender'
      />
      <TextField
        value={employee.phone}
        label={labels.no.phone}
        onChange={props.onChange}
        fieldName='phone'
        pattern='[-+ 0-9]+'
      />
      <TextField
        value={employee.email}
        label={labels.no.email}
        onChange={props.onChange}
        fieldName='email'
        pattern='.+@.+'
      />
      <TextField
        value={employee.address}
        label={labels.no.address}
        onChange={props.onChange}
        fieldName='address'
        pattern='.+'
      />
      <TextField
        value={employee.postal_code}
        label={labels.no.postal_code}
        onChange={props.onChange}
        fieldName='postal_code'
        pattern='^[0-9]+$'
      />
      <TextField
        value={employee.city}
        label={labels.no.city}
        onChange={props.onChange}
        fieldName='city'
        pattern='.+'
      />
      <DateField
        value={employee.birth_date}
        label={labels.no.birth_date}
        onChange={props.onChange}
        fieldName='birth_date'
      />
      <DateField
        value={employee.date_of_employment}
        label={labels.no.date_of_employment}
        onChange={props.onChange}
        fieldName='date_of_employment'
      />
      <DateField
        value={employee.termination_date}
        label={labels.no.termination_date}
        onChange={props.onChange}
        fieldName='termination_date'
      />
      <TextField
        value={employee.emergency_contact_name}
        label={labels.no.emergency_contact_name}
        onChange={props.onChange}
        fieldName='emergency_contact_name'
        pattern='.+'
      />
      <TextField
        value={employee.emergency_contact_phone}
        label={labels.no.emergency_contact_phone}
        onChange={props.onChange}
        fieldName='emergency_contact_phone'
        pattern='[-+ 0-9]+'
      />
      <TextField
        value={employee.emergency_contact_relation}
        label={labels.no.emergency_contact_relation}
        onChange={props.onChange}
        fieldName='emergency_contact_relation'
        pattern='.+'
      />
      <div className='mdl-grid'>
        <button className={buttonClasses} type='submit'>
          {formLabels.no.save}
        </button>
      </div>
    </form>
  );
};

EmployeeForm.propTypes = {
  employee: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  form: React.PropTypes.object
};

export default EmployeeForm;
