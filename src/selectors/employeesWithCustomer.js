import { createSelector } from "reselect";

const employeesSelector = state => state.employees;
const employeesProjectsSelector = state => state.employeesProjects;

const employeeWithAssignedCustomerSelector = (employees, employeesProjects) => {
  if (employees.loading || employeesProjects.loading) {
    return { loading: true, data: null };
  }
  console.log(employees);
  console.log(employeesProjects);

  const data = employees.data.map((e, key) => {
    const employeeProject = employeesProjects.data.get(e.id);
    return Object.assign(e, employeeProject);
  });

  return {
    loading: false,
    data: data
  };
};

export default createSelector(
  employeesSelector,
  employeesProjectsSelector,
  employeeWithAssignedCustomerSelector
);
