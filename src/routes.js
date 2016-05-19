import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import ViewEmployee from './components/viewEmployee';
import EmployeeForm from './components/employeeForm';
import CreateEmployee from './components/createEmployee';

import EmployeeContainer from './containers/employee';

export default (
  <Route path='/employees' component={App}>
    <Route path='/employees/new' component={EmployeeContainer}>
      <IndexRoute component={CreateEmployee} />
    </Route>
    <Route path='/employees/:id' component={EmployeeContainer}>
      <IndexRoute component={ViewEmployee} />
      <Route path='/employees/:id/edit' component={EmployeeForm} />
    </Route>
  </Route>
);
