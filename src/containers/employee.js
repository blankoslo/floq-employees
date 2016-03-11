// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectEmployee } from '../actions/index';

class EmployeeContainer extends Component {
  componentWillReceiveProps(props) {
    // we might have received new `employees`, so dispatch a SELECT_EMPLYEE
    // action to (possibly) update the current, selected employee
    if (props.employees !== null) {
      const selectedId = parseInt(props.params.id);
      const activeEmployee = props.employees.find(e => e.id === selectedId);
      this.props.selectEmployee(activeEmployee);
    }
  }

  render() {
    return this.props.children;
  }
}

EmployeeContainer.propTypes = {
  children: React.PropTypes.object,
  selectEmployee: React.PropTypes.func
};

const mapStateToProps = ({ employees }) => ({
  employees
});

export default connect(mapStateToProps, { selectEmployee })(EmployeeContainer);
