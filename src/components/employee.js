import React from 'react';
import ViewEmployee from './viewEmployee';
import { connect } from 'react-redux';

import Spinner from './spinner';

const Employee = (props) => {
  if (props.selected_employee === null) {
    return <Spinner />;
  }

  return <ViewEmployee employee={props.selected_employee} />;
};

Employee.propTypes = {
  selected_employee: React.PropTypes.object
};

const mapStateToProps = ({ selected_employee }) => ({
  selected_employee
});

export default connect(mapStateToProps)(Employee);
