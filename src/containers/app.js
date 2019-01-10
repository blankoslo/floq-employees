import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import subWeeks from 'date-fns/sub_weeks';
import { getEmployees, getEmployeesProjects } from '../actions/index';

import EmployeeList from './employeeList';
import EmployeeEditor from './employeeEditor';
import AddEmployeeButton from '../components/AddEmployeeButton';
import ErrorDialog from './errorDialog';

class App extends Component {
  constructor(props) {
    super(props);
    props.fetchEmployees();
    props.fetchEmployeesProjects();
  }

  render() {
    return (
      <div>
        {this.props.showErrorDialog ? <ErrorDialog /> : undefined}
        <div>
          <EmployeeList />
          {this.props.displayEmployeeEditor ? <EmployeeEditor /> : undefined}
          <AddEmployeeButton />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchEmployees: PropTypes.func.isRequired,
  fetchEmployeesProjects: PropTypes.func.isRequired,
  displayEmployeeEditor: PropTypes.bool.isRequired,
  showErrorDialog: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => {
  const toDate = new Date();
  const fromDate = subWeeks(toDate, 1);
  return {
    fetchEmployees: () => {
      dispatch(getEmployees());
    },
    fetchEmployeesProjects: () => {
      dispatch(getEmployeesProjects(fromDate, toDate));
    }
  };
};

const mapStateToProps = state => ({
  displayEmployeeEditor: state.edit.displayEmployeeEditor,
  showErrorDialog: state.error.showErrorDialog
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
