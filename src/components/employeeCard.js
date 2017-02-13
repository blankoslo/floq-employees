import React, { Component } from 'react';
import { connect } from 'react-redux';

import Employee from './employee';
import EmployeeForm from '../containers/employeeForm';
import { editEmployee } from '../actions/index';

class EmployeeCard extends Component {
  setEdit = () => {
    this.props.editEmployee(this.props.employee.id);
  }

  render() {
    if (this.props.employee === null || this.props.edit === this.props.employee.id) {
      return (
        <EmployeeForm
          employee={this.props.employee}
          form={null}
        />
      );
    }
    return (
      <Employee
        employee={this.props.employee}
        onEdit={this.setEdit}
      />
    );
  }
}

EmployeeCard.propTypes = {
  employee: React.PropTypes.object,
  editEmployee: React.PropTypes.func,
  edit: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  edit: state.edit
});

const mapDispatchToProps = {
  editEmployee
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCard);
