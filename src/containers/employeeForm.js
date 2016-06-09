import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createEmployee, updateEmployee, updateField } from '../actions/index';

const FORM_NAME = 'edit_employee';

class EmployeeForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  onSubmit = (e) => {
    e.preventDefault();

    // note that employee contains data and loading, while data contains id, name etc.
    const employee = this.props.employee.data;

    // no changes
    if (employee !== null && this.props.form === null) {
      this.context.router.push(`/employees/${employee.id}`);
      document.getElementById('detail').scrollIntoView();
      return;
    }

    const data = this.props.form
      ? this.props.form[FORM_NAME]
      : {};

    const persist = employee === null
      ? this.props.createEmployee(data)
      : this.props.updateEmployee(employee.id, data);

    persist.then(res => {
      // when POSTing a new employee, we get the object back, but when PATCHing an existing employee
      // we get a one-element list back.
      debugger;
      const next = employee === null
                 ? `/employees/${res.payload.data.id}`
                 : `/employees/${res.payload.data[0].id}`;

      this.context.router.push(next);
      document.getElementById('detail').scrollIntoView();
    });
  }

  onChange = (fieldName, value) => this.props.updateField(FORM_NAME, fieldName, value);

  render() {
    // pass `employee` prop to children
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        employee: this.props.employee,
        onSubmit: this.onSubmit,
        onChange: this.onChange
      }));

    return <div>{children}</div>;
  }
}

EmployeeForm.propTypes = {
  employee: React.PropTypes.object,
  form: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  children: React.PropTypes.object,
  updateEmployee: React.PropTypes.func,
  createEmployee: React.PropTypes.func,
  updateField: React.PropTypes.func
};

const mapStateToProps = (state) => ({
  form: state.form
});

const mapDispatchToProps = {
  createEmployee,
  updateEmployee,
  updateField
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
