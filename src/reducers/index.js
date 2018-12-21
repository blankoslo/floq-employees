import EmployeesReducer from './employees';
import ErrorReducer from './error';
import EmployeeEditorReducer from './employeeEditorReducer';
import EmployeesProjectsReducer from './employeesProjects';
import SearchReducer from './searchReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = {
  app: (state = { dateToday: new Date() }) => state,
  employees: EmployeesReducer,
  employeesProjects: EmployeesProjectsReducer,
  search: SearchReducer,
  error: ErrorReducer,
  edit: EmployeeEditorReducer,
  form: formReducer
};

export default rootReducer;
