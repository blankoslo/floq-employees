import { createSelector } from 'reselect';

const employeesSelector = state => state.employees;
const selectedEmployeeSelector = state => state.selected_employee;

const getEmployee = (employees, selectedEmployee) => {
  if (selectedEmployee === null) {
    return null;
  }

  return employees.find(e => e.id === selectedEmployee) || null;
};

export default createSelector(
  employeesSelector,
  selectedEmployeeSelector,
  getEmployee
);
