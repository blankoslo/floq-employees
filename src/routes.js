// @flow

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import Employee from './components/employee';
import EmployeeForm from './components/employeeForm';

import EmployeeContainer from './containers/employee';

export default (
  <Route path='/employees' component={App}>
    <Route path='/employees/:id' component={EmployeeContainer}>
      <IndexRoute component={Employee} />
      <Route path='/employees/:id/edit' component={EmployeeForm} />
    </Route>
  </Route>
);
