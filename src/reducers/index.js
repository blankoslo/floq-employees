import EmployeesReducer from './employees';
import SelectedEmployeeReducer from './selectedEmployee';
import FormReducer from './form';
import ErrorReducer from './error';
import EditReducer from './edit';
import CreatingEmployeeReducer from './create';

const rootReducer = {
  employees: EmployeesReducer,
  selected_employee: SelectedEmployeeReducer,
  form: FormReducer,
  error: ErrorReducer,
  edit: EditReducer,
  creatingEmployee: CreatingEmployeeReducer
};

export default rootReducer;
