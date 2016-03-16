// @flow

import * as _ from 'lodash';
import { combineReducers } from 'redux';
import GetEmployeesReducer from './getEmployees';
import SelectEmployeeReducer from './selectEmployee';

const FormReducer = (state = null, action) => {
  switch (action.type) {
    case 'FORM_UPDATE_VALUE':
      return _.merge({}, state, action.payload);
    case 'FORM_RESET':
      return {};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  employees: GetEmployeesReducer,
  selected_employee: SelectEmployeeReducer,
  form: FormReducer
});

export default rootReducer;
