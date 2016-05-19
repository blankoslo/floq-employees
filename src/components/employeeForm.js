import React from 'react';
import * as _ from 'lodash';

import { isLoading, getValue } from '../loading';
import TextField from './formItems/textField';
import DateField from './formItems/dateField';
import SelectField from './formItems/selectField';
import { employeeFormLabels as labels, formLabels } from '../strings';

const buttonClasses = 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored';

const fields = {
  first_name: { type: 'TextField' },
  last_name: { type: 'TextField' },
  title: { type: 'TextField' },
  gender: {
    type: 'SelectField',
    choices: ['female', 'male', 'other'],
    labels: labels.no
  },
  phone: { type: 'TextField', pattern: '[-+ 0-9]+' },
  email: { type: 'TextField', pattern: '.+@.+' },
  address: { type: 'TextField' },
  postal_code: { type: 'TextField', pattern: '^[0-9]+$' },
  city: { type: 'TextField' },
  birth_date: { type: 'DateField' },
  date_of_employment: { type: 'DateField' },
  termination_date: { type: 'DateField' },
  emergency_contact_name: { type: 'TextField' },
  emergency_contact_phone: { type: 'TextField', pattern: '[-+ 0-9]+' },
  emergency_contact_relation: { type: 'TextField' }
};

const renderField = (props, fieldConfig, fieldName) => {
  const employee = getValue(props.employee);

  switch (fieldConfig.type) {
    case 'TextField':
      return (
        <TextField
          value={employee[fieldName] || ''}
          label={labels.no[fieldName]}
          onChange={props.onChange}
          fieldName={fieldName}
          pattern={fieldConfig.pattern || '.+'}
          key={fieldName}
        />
      );
    case 'DateField':
      return (
        <DateField
          value={employee[fieldName] || ''}
          label={labels.no[fieldName]}
          onChange={props.onChange}
          fieldName={fieldName}
          key={fieldName}
        />
      );
    case 'SelectField':
      return (
        <SelectField
          choices={fieldConfig.choices}
          value={employee[fieldName]}
          labels={labels.no}
          onChange={props.onChange}
          fieldName={fieldName}
          key={fieldName}
        />
      );
    default:
      throw new Error(`Unknown field type: ${fieldConfig.type}`);
  }
};

renderField.propTypes = {
  employee: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

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

  const fieldElems = _.map(fields, (config, fieldName) => renderField(props, config, fieldName));

  return (
    <form onSubmit={props.onSubmit}>
      {fieldElems}
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
