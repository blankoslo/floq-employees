import { createSelector } from 'reselect';

import { loading, loaded, isLoading, getValue } from '../loading';

const employeesSelector = state => state.employees;
const selectedEmployeeSelector = state => state.selected_employee;

const getEmployee = (employees, selectedEmployee) => {
  if (selectedEmployee === null || isLoading(employees)) {
    return loading();
  }

  const employee = getValue(employees).find(e => e.id === selectedEmployee) || null;
  return loaded(employee);
};

export default createSelector(
  employeesSelector,
  selectedEmployeeSelector,
  getEmployee
);
