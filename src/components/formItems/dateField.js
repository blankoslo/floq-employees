import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import { formatIso } from 'material-ui/DatePicker/dateUtils';

const textFieldClasses = 'mdl-textfield mdl-js-textfield';

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
      <div style={{ width: '100%', paddingTop: '0px' }} className={textFieldClasses}>
        <DatePicker
          floatingLabelText={this.props.label}
          floatingLabelStyle={{ color: '#414cb7' }}
          fullWidth
          floatingLabelFocusStyle={{ color: '#414cb7' }}
          hintText={this.props.label}
          value={this.state.date}
          onChange={this.onChange}
          autoOk
          maxDate={oneYearFromNow}
          textFieldStyle={{ fontSize: '14px', margin: '0px' }}
        />
      </div>
    );
  }
}

DateField.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

export default DateField;
