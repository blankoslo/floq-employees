import EmployeesReducer from './employees';
import SelectedEmployeeReducer from './selectedEmployee';
import ErrorReducer from './error';
import EmployeeEditorReducer from './employeeEditorReducer';
import EmployeesProjectsReducer from './employeesProjects';
import { reducer as formReducer } from 'redux-form';

const rootReducer = {
  app: (state = { dateToday: new Date() }) => state,
  employees: EmployeesReducer,
  employeesProjects: EmployeesProjectsReducer,
  selected_employee: SelectedEmployeeReducer,
  error: ErrorReducer,
  edit: EmployeeEditorReducer,
  form: formReducer
};

export default rootReducer;
