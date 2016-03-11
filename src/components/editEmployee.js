// @flow

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getEmployees, updateEmployee, updateField } from '../actions/index';
import TextField from './formItems/textField';
import DateField from './formItems/dateField';
import SelectField from './formItems/selectField';
import { employeeFormLabels as labels, formLabels } from '../strings';

const FORM_NAME = 'edit_employee';

const buttonClasses = 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored';

class EditEmployee extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  onSubmit(e) {
    e.preventDefault();

    // no changes
    if (this.props.form === null) {
      this.context.router.push(`/employees/${this.props.selected_employee.id}`);
      return;
    }

    const data = this.props.form[FORM_NAME];
    this.props.updateEmployee(this.props.selected_employee.id, data)
        .then(res => {
          console.log('Response', res);
          if (res.error === true) {
            alert(res.payload.data.message); // FIXME
          } else {
            this.props.getEmployees();
            this.context.router.push(`/employees/${this.props.selected_employee.id}`);
          }
        });
  }

  onChange(fieldName, value) {
    this.props.updateField(FORM_NAME, fieldName, value);
  }

  render() {
    const employee = this.props.employee;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <TextField
          value={employee.first_name}
          label={labels.no.first_name}
          onChange={this.onChange.bind(this, 'first_name')}
          id='first_name'
          pattern='.+'
        />
        <TextField
          value={employee.last_name}
          label={labels.no.last_name}
          onChange={this.onChange.bind(this, 'last_name')}
          id='last_name'
          pattern='.+'
        />
        <TextField
          value={employee.title}
          label={labels.no.title}
          onChange={this.onChange.bind(this, 'title')}
          id='title'
          pattern='.+'
        />
        <SelectField
          choices={['female', 'male', 'other']}
          labels={labels.no}
          value={employee.gender}
          onChange={this.onChange.bind(this, 'gender')}
          id='gender'
        />
        <TextField
          value={employee.phone}
          label={labels.no.phone}
          onChange={this.onChange.bind(this, 'phone')}
          id='phone'
          pattern='[-+ 0-9]+'
        />
        <TextField
          value={employee.email}
          label={labels.no.email}
          onChange={this.onChange.bind(this, 'email')}
          id='email'
          pattern='.+@.+'
        />
        <TextField
          value={employee.address}
          label={labels.no.address}
          onChange={this.onChange.bind(this, 'address')}
          id='address'
          pattern='.+'
        />
        <TextField
          value={employee.postal_code}
          label={labels.no.postal_code}
          onChange={this.onChange.bind(this, 'postal_code')}
          id='postal_code'
          pattern='^\d+$'
        />
        <TextField
          value={employee.city}
          label={labels.no.city}
          onChange={this.onChange.bind(this, 'city')}
          id='city'
          pattern='.+'
        />
        <DateField
          value={employee.birth_date}
          label={labels.no.birth_date}
          onChange={this.onChange.bind(this, 'birth_date')}
          id='birth_date'
        />
        <DateField
          value={employee.date_of_employment}
          label={labels.no.date_of_employment}
          onChange={this.onChange.bind(this, 'date_of_employment')}
          id='date_of_employment'
        />
        <DateField
          value={employee.termination_date}
          label={labels.no.termination_date}
          onChange={this.onChange.bind(this, 'termination_date')}
          id='termination_date'
        />
        <TextField
          value={employee.emergency_contact_name}
          label={labels.no.emergency_contact_name}
          onChange={this.onChange.bind(this, 'emergency_contact_name')}
          id='emergency_contact_name'
          pattern='.+'
        />
        <TextField
          value={employee.emergency_contact_phone}
          label={labels.no.emergency_contact_phone}
          onChange={this.onChange.bind(this, 'emergency_contact_phone')}
          id='emergency_contact_phone'
          pattern='[-+ 0-9]+'
        />
        <TextField
          value={employee.emergency_contact_relation}
          label={labels.no.emergency_contact_relation}
          onChange={this.onChange.bind(this, 'emergency_contact_relation')}
          id='emergency_contact_relation'
          pattern='.+'
        />
        <div className='mdl-grid'>
          <button className={buttonClasses} type='submit'>
            {formLabels.no.save}
          </button>
        </div>
      </form>
    );
  }
}

EditEmployee.propTypes = {
  employee: React.PropTypes.object.isRequired,
  selected_employee: React.PropTypes.object,
  form: React.PropTypes.object,
  getEmployees: React.PropTypes.func,
  updateEmployee: React.PropTypes.func,
  updateField: React.PropTypes.func
};

const mapStateToProps = ({ form, selected_employee }) => ({
  form,
  selected_employee
});

const mapDispatchToProps = {
  getEmployees,
  updateEmployee,
  updateField
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);
