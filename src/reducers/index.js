import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import EmployeesReduser from './employees';

const rootReducer = combineReducers({
  employees: EmployeesReduser,
  form: FormReducer
});

export default rootReducer;
