// @flow

import React, { Component } from 'react';

class SelectField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  onChange(value) {
    console.log(value);
    this.setState({
      value
    });

    this.props.onChange(this.props.fieldName, value);
  }

  render() {
    const buttons = this.props.choices.map(choice => (
      <div key={choice} className='mdl-cell mdl-cell--4-col'>
        <label
          className='mdl-radio mdl-js-radio mdl-js-ripple-effect'
          htmlFor={choice}
        >
        <input
          type='radio' id={choice} className='mdl-radio__button'
          name='options'
          value={choice}
          onChange={this.onChange.bind(this, choice)}
          checked={choice === this.state.value}
        />
          <span className='mdl-radio__label'>{this.props.labels[choice]}</span>
        </label>
      </div>
    ));

    return (
      <div className='mdl-grid'>
        {buttons}
      </div>
    );
  }
}

SelectField.propTypes = {
  value: React.PropTypes.string,
  labels: React.PropTypes.object.isRequired,
  choices: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default SelectField;
