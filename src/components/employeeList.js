import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeCard from './employeeCard';
import Spinner from './spinner';
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

    if (this.props.isNew === true) {
      return (
        <div className='floq-list'>
          <div className='floq-list-header'>
            <button
              onClick={() => { this.setNew(false); }}
              id='add-employee-button'
              className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
            >
              <i className='material-icons dark-gray'>clear</i>
            </button>
          </div>
          <EmployeeCard employee={null} />
          {employeeRows}
        </div>
      );
    }

    return (
      <div className='floq-list'>
        <div className='floq-list-header'>
          <button
            onClick={() => { this.setNew(true); }}
            id='add-employee-button'
            className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
          >
            <i className='material-icons dark-gray'>add</i>
          </button>
        </div>
        {employeeRows}
      </div>
    );
  }
}

EmployeeList.propTypes = {
  employees: React.PropTypes.object.isRequired,
  newEmployee: React.PropTypes.func,
  isNew: React.PropTypes.boolean
};

const mapStateToProps = (state) => (
  { isNew: state.isNew }
);

const mapDispatchToProps = {
  newEmployee
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
