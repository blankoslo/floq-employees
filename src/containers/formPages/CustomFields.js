import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TextInput = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input className='floq-text-input__input' {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);

TextInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export const InputLabel = ({ labelText, children }) => (
  <div className={'floq_form_input_label'}>
    <h6 className={'floq_form_input_label__header_text'}>{labelText}</h6>
    {children}
  </div>
);

InputLabel.propTypes = {
  labelText: PropTypes.string,
  children: PropTypes.array
};

export const Button = ({ value, type, currentValue, onChange, label, fieldName }) => {
  const className = classNames('floq-button-group__button', {
    [`floq-button-group__button-${fieldName}--selected`]: currentValue === value
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

export const ButtonGroup = props => {
  const {
    options,
    input: { value: currentValue, onChange, name: fieldName }
  } = props;
  return (
    <div className='floq-button-group'>
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

ButtonGroup.propTypes = {
  options: PropTypes.array,
  input: PropTypes.object
};

export const TextArea = props => {
  const {
    label,
    input: { value, onChange }
  } = props;
  return (
    <textarea className='floq-textarea' placeholder={label} onChange={onChange}>
      {value}
    </textarea>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object
};
