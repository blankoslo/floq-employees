import EmployeesReducer from './employees';
import SelectedEmployeeReducer from './selectedEmployee';
import FormReducer from './form';
import ErrorReducer from './error';
import EditReducer from './edit';
import NewReducer from './new';

const rootReducer = {
  employees: EmployeesReducer,
  selected_employee: SelectedEmployeeReducer,
  form: FormReducer,
  error: ErrorReducer,
  edit: EditReducer,
  creatingEmployee: NewReducer
};

export default rootReducer;
