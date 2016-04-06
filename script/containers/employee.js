// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectEmployee } from '../actions/index';

class EmployeeContainer extends Component {
  componentDidMount() {
    // dispatch a SELECT_EMPLOYEE in case there is no active employee for the
    // initial render
    if (this.props.employees !== null && this.props.params.id !== undefined) {
      const selectedId = parseInt(this.props.params.id);
      const activeEmployee = this.props.employees.find(e => e.id === selectedId);
      this.props.selectEmployee(activeEmployee);
    } else {
      this.props.selectEmployee(null);
    }
  }

  componentWillReceiveProps(props) {
    // we might have received new `employees`, so dispatch a SELECT_EMPLOYEE
    // action to (possibly) update the current, selected employee
    if (props.employees !== null && props.params.id !== undefined) {
      const selectedId = parseInt(props.params.id);
      const activeEmployee = props.employees.find(e => e.id === selectedId);
      this.props.selectEmployee(activeEmployee);
    } else {
      this.props.selectEmployee(null);
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
