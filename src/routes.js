import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import Employee from './components/employee';
import CreateEmployee from './components/createEmployee';

import EmployeeFormContainer from './containers/employeeForm';
import EmployeeContainer from './containers/employee';

export default (
  <Route path='/employees' component={App}>
    <Route path='/employees/new' component={EmployeeContainer}>
      <IndexRoute component={CreateEmployee} />
    </Route>
    <Route path='/employees/:id' component={EmployeeContainer}>
      <IndexRoute component={Employee} />
      <Route path='/employees/:id/edit' component={EmployeeFormContainer} />
    </Route>
  </Route>
);
