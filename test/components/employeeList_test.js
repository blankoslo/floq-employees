/* eslint-disable no-unused-expressions */

import { renderComponent, expect } from '../testhelper';
import EmployeeList from '../../src/containers/employeeList';
import * as Immutable from 'immutable';

const loadingEmployees = {
  loading: true,
  data: null
};

const employees = {
  loading: false,
  data: new Immutable.OrderedMap({
    0: {
      id: 0,
      first_name: 'X',
      last_name: 'Y',
      email: 'xy@foo',
      image_url: null
    }
  })
};

describe('EmployeeList', () => {
  it('exists', () => {
    const component = renderComponent(EmployeeList, { employees });

    expect(component).to.exist;
  });

  it('shows a spinner while loading', () => {
    const component = renderComponent(EmployeeList, { employees: loadingEmployees });

    expect(component).to.have.class('loading-spinner');
  });

  it('shows a list if employees are loaded', () => {
    const component = renderComponent(EmployeeList, { employees });

    expect(component.find('.floq-list-header')).to.exist;
  });
});
