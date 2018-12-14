import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export const Button = ({ value, type, currentValue, onChange, label, fieldName }) => {
  const className = classNames('floq-title-select__button', {
    [`floq-${fieldName}-select__button--selected`]: currentValue === value
  });
  return (
    <button type={type} className={className} value={value} onClick={() => onChange(value)}>
      {label}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  currentValue: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  fieldName: PropTypes.string
};

export const TitleSelect = props => {
  const {
    options,
    input: { value: currentValue, onChange, name: fieldName }
  } = props;
  return (
    <div>
      {options.map(({ label, value }, key) => (
        <Button
          key={key}
          currentValue={currentValue}
          type='button'
          label={label}
          value={value}
          fieldName={fieldName}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

TitleSelect.propTypes = {
  options: PropTypes.array,
  input: PropTypes.object
};
