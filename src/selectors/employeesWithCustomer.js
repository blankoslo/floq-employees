import { createSelector } from "reselect";

const employeesSelector = state => state.employees;
const employeesProjectsSelector = state => state.employeesProjects;

const isEmployeed = employee => {
  if (employee.termination_date !== null) {
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    return today <= new Date(employee.termination_date);
  }
  return true;
};

const employeeWithAssignedCustomerSelector = (employees, employeesProjects) => {
  if (employees.loading || employeesProjects.loading) {
    return { loading: true, data: null };
  }

  let data = employees.data;

  if (employees.removeTerminated) {
    data = data.filter(isEmployeed);
  }

  data = data.map((e, key) => {
    const employeeProject = employeesProjects.data.get(e.id);
    return Object.assign(e, employeeProject);
  });

  const technologists = data.filter(employee => employee.title === "Teknolog");
  const designers = data.filter(employee => employee.title === "Designer");
  const other = data.filter(
    employee => employee.title !== "Teknolog" && employee.title !== "Designer"
  );

  return {
    loading: false,
    data: { technologists, designers, other }
  };
};

export default createSelector(
  employeesSelector,
  employeesProjectsSelector,
  employeeWithAssignedCustomerSelector
);
