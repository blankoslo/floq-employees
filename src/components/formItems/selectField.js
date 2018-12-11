import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SelectField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  onChange(value) {
    this.setState({
      value
    });

    this.props.onChange(this.props.fieldName, value);
  }

  render() {
    const buttons = this.props.choices.map(choice => (
      <div key={choice} className='mdl-cell mdl-cell--4-col'>
        <label className='mdl-radio mdl-js-radio mdl-js-ripple-effect' htmlFor={choice}>
          <input
            type='radio'
            id={choice}
            className='mdl-radio__button'
            name='options'
            value={choice}
            onChange={() => {
              this.setState({ value: choice });
              this.props.onChange(this.props.fieldName, choice);
            }}
            checked={choice === this.state.value}
          />
          <span className='mdl-radio__label floq-card-textfield'>{this.props.labels[choice]}</span>
        </label>
      </div>
    ));

    return <div className='mdl-grid'>{buttons}</div>;
  }
}

SelectField.propTypes = {
  value: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  choices: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectField;
