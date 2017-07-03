import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeCard from './employeeCard';
import Spinner from '../components/spinner';
import { newEmployee } from '../actions/index';

class EmployeeList extends Component {
  setNew = (value) => {
    this.props.newEmployee(value);
  }

  render() {
    if (this.props.employees.loading) {
      return <Spinner />;
    }

    const employeeRows = this.props.employees.data.valueSeq().map(employee =>
      <EmployeeCard key={employee.id} employee={employee} />
    );

    

    return (
      <div className='floq-list'>
        <div className='floq-list-header'>
          <button
            onClick={() => { this.setNew(!this.props.creatingEmployee); }}
            id='add-employee-button'
            className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
          >
            <i className='material-icons dark-gray'>{this.props.creatingEmployee ? 'clear' : 'add'}</i>
          </button>
        </div>
        <div className='floq-cards'>
          { this.props.creatingEmployee ? <EmployeeCard employee={null} /> : null }
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
