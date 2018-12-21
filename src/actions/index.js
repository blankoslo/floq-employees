import * as api from '../apiclient';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';

export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_EMPLOYEES_PROJECTS = 'GET_EMPLOYEES_PROJECTS';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export const FORM_UPDATE_VALUE = 'FORM_UPDATE_VALUE';
export const FORM_RESET = 'FORM_RESET';

export const SET_EMPLOYEE_EDITOR_INITIAL_VALUES = 'SET_EMPLOYEE_EDITOR_INITIAL_VALUES';
export const TOGGLE_REMOVE_TERMINATED = 'TOGGLE_REMOVE_TERMINATED';
export const TOGGLE_EMPLOYEE_EDITOR = 'TOGGLE_EMPLOYEE_EDITOR';

export const SUBMIT_EMPLOYEE_FORM = 'SUBMIT_EMPLOYEE_FORM';

export const UPDATE_SEARCH_TERMS = 'UPDATE_SEARCH_TERMS';

export const apiError = message => ({
  type: API_ERROR,
  payload: message
});

export const clearApiError = () => ({
  type: API_ERROR_CLEAR
});

export const getEmployees = () => ({
  type: GET_EMPLOYEES,
  payload: api.getEmployees()
});

export const createEmployee = employee => ({
  type: CREATE_EMPLOYEE,
  payload: api.createEmployee(employee)
});

export const updateEmployee = (id, employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: api.updateEmployee(id, employee)
});

export const setEmployeeEditorInitialValues = values => ({
  type: SET_EMPLOYEE_EDITOR_INITIAL_VALUES,
  payload: values
});

export const toggleEmployeeEditor = () => ({
  type: TOGGLE_EMPLOYEE_EDITOR,
  payload: null
});

export const getEmployeesProjects = (fromDate, toDate) => ({
  type: GET_EMPLOYEES_PROJECTS,
  payload: api.getEmployeesProjects(fromDate, toDate)
});

export const toggleShowTerminated = () => ({
  type: TOGGLE_REMOVE_TERMINATED,
  payload: null
});

export const updateSearchTerms = (inputValue) => ({
  type: UPDATE_SEARCH_TERMS,
  payload: inputValue
});
// export const submitEmployeeForm = values => ({
//   type: SUBMIT_EMPLOYEE_FORM,
//   payload: values
// });
