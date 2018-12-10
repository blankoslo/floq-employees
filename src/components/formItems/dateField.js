import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import { formatIso } from 'material-ui/DatePicker/dateUtils';

const textFieldClasses = 'mdl-textfield mdl-js-textfield floq-card-textfield floq-card-datefield';

const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

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

    this.props.onChange(this.props.fieldName, formatIso(date));
  };

  render() {
    return (
      <div className={textFieldClasses}>
        <DatePicker
          floatingLabelText={this.props.label}
          floatingLabelStyle={{ fontSize: '14px' }}
          textFieldStyle={{ fontSize: '14px' }}
          fullWidth
          hintText={this.props.label}
          value={this.state.date}
          onChange={this.onChange}
          autoOk
          maxDate={oneYearFromNow}
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
