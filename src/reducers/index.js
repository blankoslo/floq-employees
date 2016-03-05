import { combineReducers } from 'redux';
import EmployeesReduser from './employees';

const rootReducer = combineReducers({
  employees: EmployeesReduser
});

export default rootReducer;
