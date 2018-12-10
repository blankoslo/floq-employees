import PropTypes from 'prop-types';
import React, { Component } from 'react';

const textFieldClasses = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label';

export default class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      blurred: false
    };
  }

  onChange = (e) => {
    const value = e.target.value;

    this.setState({
      value,
      blurred: this.state.blurred
    });

    this.props.onChange(this.props.fieldName, value);
  }

  onBlur = () => this.setState({
    value: this.state.value,
    blurred: true
  });

  render() {
    return (
      <div className={textFieldClasses}>
        <input
          fieldName={this.props.fieldName}
          className='mdl-textfield__input floq-card-textfield'
          type='text'
          pattern={this.props.pattern}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
        <label className='mdl-textfield__label floq-card-textfield' htmlFor={this.props.fieldName}>
          {this.props.label}
        </label>
        <span
          style={{ display: this.state.blurred ? 'block' : 'none' }}
          className='mdl-textfield__error'
        >
          Ugyldig format
        </span>
      </div>
    );
  }
}

TextField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string.isRequired
};
