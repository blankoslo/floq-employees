import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getEmployees, createEmployee, updateEmployee, updateField } from '../actions/index';

import View from '../components/employeeForm';

const FORM_NAME = 'edit_employee';

class EmployeeForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() { // FIXME: constructor?
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  onSubmit = (e) => {
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
      ? this.props.dispatch(createEmployee(data))
      : this.props.dispatch(updateEmployee(this.props.selected_employee.id, data));

    persist.then(res => {
      if (res.error === true) {
        const errorMessage = `Error when attempting to save data: ${res.payload.data.message}`;
        // FIXME
        alert(errorMessage); // eslint-disable-line no-alert
      } else {
        const next = this.props.selected_employee
                   ? `/employees/${this.props.selected_employee.id}`
                   : '/employees/';

        this.props.dispatch(getEmployees());
        this.context.router.push(next);
      }
    });
  }

  onChange = (fieldName, value) => this.props.dispatch(updateField(FORM_NAME, fieldName, value));

  render() {
    return (
      <View
        employee={this.props.employee}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      />
    );
  }
}

EmployeeForm.propTypes = {
  employee: React.PropTypes.object.isRequired,
  selected_employee: React.PropTypes.number,
  form: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

const mapStateToProps = ({ form, selected_employee }) => ({
  form,
  selected_employee
});

export default connect(mapStateToProps)(EmployeeForm);
