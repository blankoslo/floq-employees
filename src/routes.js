import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import Employees from './components/employees';
import ViewEmployee from './components/viewEmployee';

export default (
  <Route path="/" component={App}>
    <Route path="/employees" component={Employees}>
      <Route path="/employees/:id" component={ViewEmployee} />
    </Route>
  </Route>
);
