import { createSelector } from 'reselect';

const employeesSelector = state => state.employees;
const employeesProjectsSelector = state => state.employeesProjects;
const dateTodaySelector = state => state.app.dateToday;

const isEmployeed = (employee, dateToday) => {
  if (employee.termination_date !== null) {
    return dateToday <= new Date(employee.termination_date);
  }
  return true;
};

const employeesWithCustomerSelector = (employees, employeesProjects, dateToday) => {
  if (employees.loading || employeesProjects.loading) {
    return { loading: true, data: null };
  }

  let data = employees.data.toOrderedMap();

  if (employees.removeTerminated) {
    data = data.filter(employee => isEmployeed(employee, dateToday));
  }

  data = data.map(e => {
    const employeeProject = employeesProjects.data.get(e.id);
    return { ...e, ...employeeProject };
  });

  const technologists = data.filter(employee => employee.role === 'Teknolog');
  const designers = data.filter(employee => employee.role === 'Designer');
  const other = data.filter(employee => employee.role === 'Annet');

  return {
    loading: false,
    data: { technologists, designers, other }
  };
};

export default createSelector(
  employeesSelector,
  employeesProjectsSelector,
  dateTodaySelector,
  employeesWithCustomerSelector
);
