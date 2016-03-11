// @flow

import React, { Component } from 'react';
import ViewEmployee from './viewEmployee';
import { connect } from 'react-redux';

import Spinner from './spinner';

class Employee extends Component {
  render() {
    if (this.props.selected_employee === null) {
      return <Spinner />;
    }

    return <ViewEmployee employee={this.props.selected_employee} />;
  }
}

Employee.propTypes = {
  selected_employee: React.PropTypes.object
};

const mapStateToProps = ({ selected_employee }) => ({
  selected_employee
});

export default connect(mapStateToProps)(Employee);
