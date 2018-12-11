import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import format from 'date-fns/format';

const textFieldClasses = 'mdl-textfield mdl-js-textfield floq-card-textfield floq-card-datefield';
class DateField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.value === '' ? {} : new Date(props.value)
    };
  }

  onChange = (event, date) => {
    this.setState({
      date
    });

    this.props.onChange(this.props.fieldName, format(date, 'YYYY-MM-DD'));
  };

  render() {
    return (
      <div className={textFieldClasses}>
        <TextField
          type='date'
          label={this.props.label}
          fullWidth
          value={this.state.date}
          onChange={this.onChange}
          autoComplete
        />
      </div>
    );
  }
}

DateField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default DateField;
