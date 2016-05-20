import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/app';
import Employee from './components/employee';
import EmployeeEditor from './components/employeeEditor';
import NewEmployeeEditor from './components/newEmployeeEditor';

import EmployeeFormContainer from './containers/employeeForm';

export default (
  <Route path='/employees' component={App}>
    <Route path='new' component={EmployeeFormContainer}>
      <IndexRoute component={NewEmployeeEditor} />
    </Route>
    <Route path='edit' component={EmployeeFormContainer}>
      <Route path=':id' component={EmployeeEditor} />
    </Route>
    <Route path=':id' component={Employee} />
  </Route>
);
