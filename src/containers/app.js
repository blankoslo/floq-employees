import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../actions/index';
import selectedEmployeeSelector from '../selectors/selectedEmployee';

import EmployeeList from '../components/employeeList';
import ErrorDialog from './errorDialog';

class App extends Component {
  constructor(props) {
    super(props);

    props.dispatch(getEmployees());
  }

  render() {
    // if we have children, i.e. a detail view is shown, hide the left columns on phones
    const listClasses = this.props.children === null
                      ? 'mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet'
                      : 'mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--hide-phone';

    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        employees: this.props.employees,
        employee: this.props.selected_employee
      }));

    return (
      <div>
        <ErrorDialog />
        <div className='mdl-grid'>
          <div className={listClasses}>
            <EmployeeList employees={this.props.employees} />
          </div>
          <div id='detail' className='mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet'>
            <div className='detail-view'>
              {children}
            </div>
          </div>
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
