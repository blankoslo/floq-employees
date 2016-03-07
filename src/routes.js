import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import EmployeeList from './components/employeeList';

export default (
  <Route path="/" component={App}>
    <Route path="/employees" component={EmployeeList}>
    </Route>
  </Route>
);
