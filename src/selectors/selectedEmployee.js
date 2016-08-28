import { createSelector } from 'reselect';

const employeesSelector = state => state.employees;
const selectedEmployeeSelector = (_, props) => parseInt(props.params.employeeId);

const getEmployee = (employees, selectedEmployee) => {
  if (selectedEmployee === null || employees.loading) {
    return { loading: true, data: null };
  }

  return {
    loading: false,
    data: employees.data.get(selectedEmployee) || null
  };
};

export default createSelector(
  employeesSelector,
  selectedEmployeeSelector,
  getEmployee
);
