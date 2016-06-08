import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, selectEmployee } from '../actions/index';
import selectedEmployeeSelector from '../selectors/selectedEmployee';

import EmployeeList from '../components/employeeList';

class App extends Component {
  constructor(props) {
    super(props);

    props.dispatch(getEmployees());
  }

  componentWillReceiveProps(props) {
    // monitor `id` parameter to keep selected employee in sync
    if (props.params.id !== undefined) {
      const selectedId = parseInt(props.params.id);
      props.dispatch(selectEmployee(selectedId));
    } else {
      props.dispatch(selectEmployee(null));
    }
  }

  render() {
    const listClasses = this.props.children === null
                      ? 'mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet'
                      : 'mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--hide-phone';

    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        employees: this.props.employees,
        employee: this.props.selected_employee
      }));

    return (
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

const mapStateToProps = (state) => ({
  employees: state.employees,
  selected_employee: selectedEmployeeSelector(state)
});

export default connect(mapStateToProps)(App);
