import * as api from '../apiclient';

export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export const FORM_UPDATE_VALUE = 'FORM_UPDATE_VALUE';
export const FORM_RESET = 'FORM_RESET';

export const getEmployee = (id) => ({
  type: GET_EMPLOYEE,
  payload: api.getEmployee(id)
});

export const getEmployees = () => ({
  type: GET_EMPLOYEES,
  payload: api.getEmployees()
});

export const selectEmployee = (id) => ({
  type: SELECT_EMPLOYEE,
  payload: id
});

export const createEmployee = (employee) => ({
  type: CREATE_EMPLOYEE,
  payload: api.createEmployee(employee)
});

export const updateEmployee = (id, employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: api.updateEmployee(id, employee)
});

export const updateField = (formName, fieldName, value) => ({
  type: FORM_UPDATE_VALUE,
  payload: { [formName]: { [fieldName]: value } }
});

export const resetForm = (formName) => ({
  type: FORM_RESET,
  payload: formName
});
