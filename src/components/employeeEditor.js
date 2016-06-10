import React from 'react';
import * as _ from 'lodash';

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
  emergency_contact_name: { type: 'TextField' },
  emergency_contact_phone: { type: 'TextField', pattern: '[-+ 0-9]+' },
  emergency_contact_relation: { type: 'TextField' }
};

const renderField = (employee, onChange, fieldConfig, fieldName) => {
  switch (fieldConfig.type) {
    case 'TextField':
      return (
        <TextField
          value={employee[fieldName] || ''}
          label={labels.no[fieldName]}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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

const EmployeeEditor = (props) => {
  if (props.employee.loading) {
    return (
      <div>
        Loading.
      </div>
    );
  } else if (props.employee.data === null) {
    return (
      <div>
        Not found.
      </div>
    );
  }

  const fieldElems = _.map(fields, (config, fieldName) =>
    renderField(props.employee.data, props.onChange, config, fieldName));

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

EmployeeEditor.propTypes = {
  employee: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  form: React.PropTypes.object
};

export default EmployeeEditor;
