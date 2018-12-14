import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EmployeeCard from './employeeCard';
import Spinner from '../components/spinner';
import { toggleShowTerminated } from '../actions/index';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import employeesWithCustomerSelector from '../selectors/employeesWithCustomerSelector';
import { SearchField } from '../components/SearchField';

export const RoleColumn = ({ roleTitle, data }) => {
  const cardsData = data.valueSeq();
  return (
    <div className='role-column'>
      <h5 className='role-column__title'>{roleTitle}</h5>
      <hr className='role-column__horizontal-line' />
      {cardsData.map(employee => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

RoleColumn.propTypes = {
  roleTitle: PropTypes.string,
  data: PropTypes.object
};

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInactiveEmployees: false
    };
  }

  toggleShowInactiveEmployees = (event, isInputChecked) => {
    this.setState({ showInactiveEmployees: isInputChecked });
  };

  render() {
    if (this.props.employees.loading) {
      return <Spinner />;
    }

    return (
      <div>
        <div className='floq-list'>
          <div className='floq-list-header'>
            <SearchField />
            <FormControlLabel
              control={<Switch onChange={this.props.toggleShowTerminated} />}
              label='Vis x-blankere'
            />
          </div>
          <div className='floq-cards'>
            <RoleColumn data={this.props.employees.data.designers} roleTitle={'Designere'} />
            <RoleColumn data={this.props.employees.data.technologists} roleTitle={'Teknologer'} />
            <RoleColumn data={this.props.employees.data.other} roleTitle={'Administrasjon ++'} />
          </div>
        </div>
      </div>
    );
  }
}

EmployeeList.propTypes = {
  employees: PropTypes.object.isRequired,
  toggleShowTerminated: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  employees: employeesWithCustomerSelector(state, props)
});

const mapDispatchToProps = {
  toggleShowTerminated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeList);
