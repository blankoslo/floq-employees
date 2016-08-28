import EmployeesReducer from './employees';
import SelectedEmployeeReducer from './selectedEmployee';
import FormReducer from './form';
import ErrorReducer from './error';

const rootReducer = {
  employees: EmployeesReducer,
  selected_employee: SelectedEmployeeReducer,
  form: FormReducer,
  error: ErrorReducer
};

export default rootReducer;
