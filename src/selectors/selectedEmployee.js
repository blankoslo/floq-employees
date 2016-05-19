import { createSelector } from 'reselect';

import Loading from '../loading';

const employeesSelector = state => state.employees;
const selectedEmployeeSelector = state => state.selected_employee;

const getEmployee = (employees, selectedEmployee) => {
  if (selectedEmployee === null) {
    return Loading.loading;
  }

  const employee = employees.find(e => e.id === selectedEmployee) || null;
  return Loading.loaded(employee);
};

export default createSelector(
  employeesSelector,
  selectedEmployeeSelector,
  getEmployee
);
