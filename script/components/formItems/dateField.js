import React from 'react';

import TextField from './textField';

const DateField = props => (
  <TextField
    value={props.value}
    label={props.label}
    onChange={props.onChange}
    fieldName={props.fieldName}
    pattern='\d{4}-\d{2}-\d{2}'
  />
);

DateField.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

export default DateField;
