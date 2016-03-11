// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateField } from '../actions/index';
import EditEmployee from './editEmployee';
import Spinner from './spinner';

class EmployeeForm extends Component {
  render() {
    if (this.props.selected_employee === null) {
      return <Spinner />;
    }

    return (
      <EditEmployee employee={this.props.selected_employee} />
    );
  }
}

EmployeeForm.propTypes = {
  selected_employee: React.PropTypes.object
};

const mapStateToProps = ({ selected_employee }) => ({
  selected_employee
});

export default connect(mapStateToProps, { updateField })(EmployeeForm);
