import React from 'react';

import TextField from './textField';

const DateField = props => (
  <TextField
    value={props.value}
    label={props.label}
    onChange={props.onChange}
    fieldName={props.fieldName}
    pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
  />
);

DateField.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

export default DateField;
