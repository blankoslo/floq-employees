import React, { Component } from 'react';

const textFieldClasses = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label';

export default class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      blurred: false
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    const value = e.target.value;

    this.setState({
      value,
      blurred: this.state.blurred
    });

    this.props.onChange(this.props.fieldName, value);
  }

  onBlur() {
    this.setState({
      value: this.state.value,
      blurred: true
    });
  }

  render() {
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--12-col'>
          <div style={{ width: '100%' }} className={textFieldClasses}>
            <input
              fieldName={this.props.fieldName}
              className='mdl-textfield__input'
              type='text'
              pattern={this.props.pattern}
              value={this.state.value}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />
            <label className='mdl-textfield__label' htmlFor={this.props.fieldName}>
              {this.props.label}
            </label>
            <span
              style={{ display: this.state.blurred ? 'block' : 'none' }}
              className='mdl-textfield__error'
            >
              Ugyldig format
            </span>
          </div>
        </div>
      </div>
    );
  }
}

TextField.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  pattern: React.PropTypes.string.isRequired
};
