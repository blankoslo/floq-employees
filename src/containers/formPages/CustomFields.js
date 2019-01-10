import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TextInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className="floq-text-input">
    <input className="floq-text-input__input" {...input} placeholder={label} type={type} />
    {touched && error && <span className="floq-text-input__error-message">{error}</span>}
  </div>
);

TextInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export const InputLabel = ({ labelText, children }) => (
  <div className="floq_form_input_label">
    <h6 className="floq_form_input_label__header_text">{labelText}</h6>
    {children}
  </div>
);

InputLabel.propTypes = {
  labelText: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export const Button = ({ value, currentValue, onChange, label, fieldName }) => {
  const className = classNames('floq-button-group__button', {
    [`floq-button-group__button-${fieldName}--selected`]: currentValue === value
  });
  return (
    <button type="button" className={className} value={value} onClick={() => onChange(value)}>
      {label}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired
};

export const ButtonGroup = props => {
  const {
    options,
    input: { value: currentValue, onChange, name: fieldName }
  } = props;
  return (
    <div className="floq-button-group">
      {options.map(({ label, value }) => (
        <Button
          currentValue={currentValue}
          label={label}
          key={value}
          value={value}
          fieldName={fieldName}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  options: PropTypes.array.isRequired,
  input: PropTypes.object.isRequired
};

export const TextArea = props => {
  const {
    label,
    input: { value, onChange }
  } = props;
  return (
    <textarea value={value} className="floq-textarea" placeholder={label} onChange={onChange} />
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired
};
