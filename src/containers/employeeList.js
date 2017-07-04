import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeCard from './employeeCard';
import Spinner from '../components/spinner';
import { newEmployee } from '../actions/index';
import Toggle from 'material-ui/Toggle';

class EmployeeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInactiveEmployees: false
    };
  }

  setNew = (value) => {
    this.props.newEmployee(value);
  }

  toggleShowInactiveEmployees = (event, isInputChecked) => {
    this.setState({ showInactiveEmployees: isInputChecked });
  }

  excludeInactive = (employee) => {
    if (employee.termination_date !== null) {
      const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      return this.state.showInactiveEmployees || today <= new Date(employee.termination_date);
    }
    return true;
  }

  render() {
    if (this.props.employees.loading) {
      return <Spinner />;
    }

    const employeeRows = this.props.employees.data.valueSeq().filter(this.excludeInactive)
    .map(employee => <EmployeeCard key={employee.id} employee={employee} />);

    return (
      <div className='floq-list'>
        <div className='floq-list-header'>
          <button
            onClick={() => { this.setNew(!this.props.creatingEmployee); }}
            id='add-employee-button'
            className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
          >
            <i className='material-icons dark-gray'>{this.props.creatingEmployee ? 'clear' : 'add'}
            </i>
          </button>
          <div>
            <Toggle
              label='Inkluder tidligere ansatte'
              onToggle={this.toggleShowInactiveEmployees}
            />
          </div>
        </div>
        <div className='floq-cards'>
          {this.props.creatingEmployee ? <EmployeeCard employee={null} /> : null}
          {employeeRows}
        </div>
      </div>
    );
  }
}

EmployeeList.propTypes = {
  employees: React.PropTypes.object.isRequired,
  newEmployee: React.PropTypes.func,
  creatingEmployee: React.PropTypes.bool
};

const mapStateToProps = (state) => (
  { creatingEmployee: state.creatingEmployee }
);

const mapDispatchToProps = {
  newEmployee
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
