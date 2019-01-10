import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EmployeeCard from './employeeCard';
import Spinner from '../components/spinner';
import { toggleShowTerminated } from '../actions/index';
import employeesWithCustomerSelector from '../selectors/employeesWithCustomerSelector';
import SearchField from '../components/SearchField';

export const RoleColumn = ({ roleTitle, data }) => (
  <div className="role-column">
    <h5 className="role-column__title">{roleTitle}</h5>
    <hr className="role-column__horizontal-line" />
    {data.map(employee => (
      <EmployeeCard key={employee.id} employee={employee} />
    ))}
  </div>
);

RoleColumn.propTypes = {
  roleTitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

const EmployeeList = ({ employees, toggleTerminated }) => {
  if (employees.loading) {
    return <Spinner />;
  }

  const { designers, technologists, other } = employees.data;

  return (
    <div>
      <div className="floq-list">
        <div className="floq-list-header">
          <SearchField />
          <FormControlLabel
            className="floq-list-header__filter-unemployed-switch"
            control={<Switch onChange={toggleTerminated} />}
            label="Vis eks-blankere"
          />
        </div>
        <div className="floq-cards">
          {designers.size > 0 && <RoleColumn data={designers} roleTitle="Designere" />}
          {technologists.size > 0 && <RoleColumn data={technologists} roleTitle="Teknologer" />}
          {other.size > 0 && <RoleColumn data={other} roleTitle="Administrasjon ++" />}
        </div>
      </div>
    </div>
  );
};

EmployeeList.propTypes = {
  employees: PropTypes.object.isRequired,
  toggleTerminated: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  employees: employeesWithCustomerSelector(state, props)
});

const mapDispatchToProps = {
  toggleTerminated: toggleShowTerminated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeList);
