import EmployeesReducer from './employees';
import SelectedEmployeeReducer from './selectedEmployee';
import FormReducer from './form';
import ErrorReducer from './error';
import EditReducer from './edit';
import CreatingEmployeeReducer from './create';
import EmployeesProjectsReducer from './employeesProjects';

const rootReducer = {
  app: (state = { dateToday: new Date() }) => state,
  employees: EmployeesReducer,
  employeesProjects: EmployeesProjectsReducer,
  selected_employee: SelectedEmployeeReducer,
  form: FormReducer,
  error: ErrorReducer,
  edit: EditReducer,
  creatingEmployee: CreatingEmployeeReducer
};

export default rootReducer;
