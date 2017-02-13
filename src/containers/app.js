import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../actions/index';
import selectedEmployeeSelector from '../selectors/selectedEmployee';

import EmployeeList from '../containers/employeeList';
import ErrorDialog from './errorDialog';

class App extends Component {
  constructor(props) {
    super(props);
    props.dispatch(getEmployees());
  }

  render() {
    // if we have children, i.e. a detail view is shown, hide the left columns on phones
    const classes = this.props.children === null
                      ? 'floq-app-employees floq-list-and-details floq-hide-details-mobile'
                      : 'floq-app-employees floq-list-and-details floq-hide-list-mobile';

    return (
      <div>
        <ErrorDialog />
        <div className={classes}>
          <EmployeeList employees={this.props.employees} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  employees: React.PropTypes.object,
  selected_employee: React.PropTypes.object,
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  params: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
  employees: state.employees,
  selected_employee: selectedEmployeeSelector(state, ownProps)
});

export default connect(mapStateToProps)(App);
