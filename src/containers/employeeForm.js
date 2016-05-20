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

    // no changes
    if (this.props.employee !== null && this.props.form === null) {
      this.context.router.push(`/employees/${this.props.employee}`);
      document.getElementById('detail').scrollIntoView();
      return;
    }

    const data = this.props.form
      ? this.props.form[FORM_NAME]
      : {};

    const persist = this.props.employee === null
      ? this.props.dispatch(createEmployee(data))
      : this.props.dispatch(updateEmployee(this.props.employee, data));

    persist.then(res => {
      if (res.error === true) {
        const errorMessage = `Error when attempting to save data: ${res.payload.data.message}`;
        // FIXME
        alert(errorMessage); // eslint-disable-line no-alert
      } else {
        const next = this.props.employee
                   ? `/employees/${this.props.employee}`
                   : '/employees/';

        this.context.router.push(next);
        document.getElementById('detail').scrollIntoView();
      }
    });
  }

  onChange = (fieldName, value) => this.props.dispatch(updateField(FORM_NAME, fieldName, value));

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
  children: React.PropTypes.object
};

const mapStateToProps = (state) => ({
  form: state.form
});

export default connect(mapStateToProps)(EmployeeForm);
