import { createSelector } from 'reselect';
import Fuse from 'fuse.js';
import * as Immutable from 'immutable';

const options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    { name: 'title', weight: 0.8 },
    { name: 'first_name', weight: 0.9 },
    { name: 'last_name', weight: 0.7 },
    { name: 'customer_name', weight: 0.8 },
    { name: 'city', weight: 0.6 },
    { name: 'phone', weight: 0.9 },
    { name: 'emoji', weight: 0.9 }
  ]
};

const employeesSelector = state => state.employees;
const employeesProjectsSelector = state => state.employeesProjects;
const dateTodaySelector = state => state.app.dateToday;
const searchTermsSelector = state => state.search.terms;

// If employee project does not exist, use fallback project
const fallbackProject = { customer_id: null, customer_name: 'Blank' };

const isEmployeed = (employee, dateToday) => {
  if (employee.termination_date !== null) {
    return dateToday <= new Date(employee.termination_date);
  }
  return true;
};

const employeesWithCustomerSelector = (employees, employeesProjects, dateToday, searchTerms) => {
  if (employees.loading || employeesProjects.loading) {
    return { loading: true, data: null };
  }

  let data = employees.data.toList();

  if (employees.removeTerminated) {
    data = data.filter(employee => isEmployeed(employee, dateToday));
  }

  data = data.map(e => {
    const employeeProject = employeesProjects.data.get(e.id);
    return { ...e, ...fallbackProject, ...employeeProject };
  });

  if (searchTerms) {
    const fuse = new Fuse(data.toArray(), options);
    data = new Immutable.List(fuse.search(searchTerms));
  }

  // Add random card color (placed here to avoid rerender)
  data = data.map(e => ({ ...e, cardColor: Math.round(Math.random(), 1) }));

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
  searchTermsSelector,
  employeesWithCustomerSelector
);
