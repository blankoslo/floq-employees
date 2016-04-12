import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getEmployees, createEmployee, updateEmployee, updateField } from '../actions/index';
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

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  onSubmit(e) {
    e.preventDefault();

    // no changes
    if (this.props.selected_employee !== null && this.props.form === null) {
      this.context.router.push(`/employees/${this.props.selected_employee.id}`);
      return;
    }

    const data = this.props.form
      ? this.props.form[FORM_NAME]
      : {};

    const persist = this.props.selected_employee === null
      ? this.props.createEmployee(data)
      : this.props.updateEmployee(this.props.selected_employee.id, data);

    persist.then(res => {
      if (res.error === true) {
        const errorMessage = `Error when attempting to save data: ${res.payload.data.message}`;
        // FIXME
        alert(errorMessage); // eslint-disable-line no-alert
      } else {
        const next = this.props.selected_employee
                   ? `/employees/${this.props.selected_employee.id}`
                   : '/employees/';

        this.props.getEmployees();
        this.context.router.push(next);
      }
    });
  }

  onChange(fieldName, value) {
    this.props.updateField(FORM_NAME, fieldName, value);
  }

  render() {
    const employee = this.props.employee;

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          value={employee.first_name}
          label={labels.no.first_name}
          onChange={this.onChange}
          fieldName='first_name'
          pattern='.+'
        />
        <TextField
          value={employee.last_name}
          label={labels.no.last_name}
          onChange={this.onChange}
          fieldName='last_name'
          pattern='.+'
        />
        <TextField
          value={employee.title}
          label={labels.no.title}
          onChange={this.onChange}
          fieldName='title'
          pattern='.+'
        />
        <SelectField
          choices={['female', 'male', 'other']}
          labels={labels.no}
          value={employee.gender}
          onChange={this.onChange}
          fieldName='gender'
        />
        <TextField
          value={employee.phone}
          label={labels.no.phone}
          onChange={this.onChange}
          fieldName='phone'
          pattern='[-+ 0-9]+'
        />
        <TextField
          value={employee.email}
          label={labels.no.email}
          onChange={this.onChange}
          fieldName='email'
          pattern='.+@.+'
        />
        <TextField
          value={employee.address}
          label={labels.no.address}
          onChange={this.onChange}
          fieldName='address'
          pattern='.+'
        />
        <TextField
          value={employee.postal_code}
          label={labels.no.postal_code}
          onChange={this.onChange}
          fieldName='postal_code'
          pattern='^\d+$'
        />
        <TextField
          value={employee.city}
          label={labels.no.city}
          onChange={this.onChange}
          fieldName='city'
          pattern='.+'
        />
        <DateField
          value={employee.birth_date}
          label={labels.no.birth_date}
          onChange={this.onChange}
          fieldName='birth_date'
        />
        <DateField
          value={employee.date_of_employment}
          label={labels.no.date_of_employment}
          onChange={this.onChange}
          fieldName='date_of_employment'
        />
        <DateField
          value={employee.termination_date}
          label={labels.no.termination_date}
          onChange={this.onChange}
          fieldName='termination_date'
        />
        <TextField
          value={employee.emergency_contact_name}
          label={labels.no.emergency_contact_name}
          onChange={this.onChange}
          fieldName='emergency_contact_name'
          pattern='.+'
        />
        <TextField
          value={employee.emergency_contact_phone}
          label={labels.no.emergency_contact_phone}
          onChange={this.onChange}
          fieldName='emergency_contact_phone'
          pattern='[-+ 0-9]+'
        />
        <TextField
          value={employee.emergency_contact_relation}
          label={labels.no.emergency_contact_relation}
          onChange={this.onChange}
          fieldName='emergency_contact_relation'
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
  createEmployee: React.PropTypes.func,
  updateEmployee: React.PropTypes.func,
  updateField: React.PropTypes.func
};

const mapStateToProps = ({ form, selected_employee }) => ({
  form,
  selected_employee
});

const mapDispatchToProps = {
  getEmployees,
  createEmployee,
  updateEmployee,
  updateField
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);
