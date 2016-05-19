import { combineReducers } from 'redux';

import EmployeesReducer from './employees';
import SelectedEmployeeReducer from './selectedEmployee';
import FormReducer from './form';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
  selected_employee: SelectedEmployeeReducer,
  form: FormReducer
});

export default rootReducer;
