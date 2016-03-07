import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import EmployeeList from './components/employeeList';
import ViewEmployee from './components/viewEmployee';

export default (
  <Route path="/" component={App}>
    <Route path="/employees" component={EmployeeList}>
      <Route path="/employees/:id" component={ViewEmployee} />
    </Route>
  </Route>
);
