import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployees, getEmployeesProjects } from "../actions/index";

import EmployeeList from "../containers/employeeList";
import ErrorDialog from "./errorDialog";
import subWeeks from "date-fns/sub_weeks";

class App extends Component {
  constructor(props) {
    super(props);
    props.fetchEmployees();
    props.fetchEmployeesProjects();
    // props.dispatch(getEmployeesProjects());
  }

  render() {
    // if we have children, i.e. a detail view is shown, hide the left columns on phones
    const classes =
      this.props.children === null
        ? "floq-app-employees floq-list-and-details floq-hide-details-mobile"
        : "floq-app-employees floq-list-and-details floq-hide-list-mobile";
    return (
      <div>
        <ErrorDialog />
        <div className={classes}>
          <EmployeeList />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  employees: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func,
  params: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({});

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
