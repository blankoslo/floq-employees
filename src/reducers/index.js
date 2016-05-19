import { combineReducers } from 'redux';
import GetEmployeesReducer from './getEmployees';
import SelectEmployeeReducer from './selectEmployee';
import FormReducer from './form';

const rootReducer = combineReducers({
  employees: GetEmployeesReducer,
  selected_employee: SelectEmployeeReducer,
  form: FormReducer
});

export default rootReducer;
