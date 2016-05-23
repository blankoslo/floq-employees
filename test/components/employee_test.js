/* eslint-disable no-unused-expressions */

import * as _ from 'lodash';
import { renderComponent, expect } from '../testhelper';
import Employee from '../../src/components/employee';

const loadingEmployee = {
  loading: true,
  data: null
};

const employee = {
  loading: false,
  data: {
    first_name: 'Foo',
    last_name: 'Bar',
    title: 'Teknolog',
    phone: '99999999',
    email: 'foo@bar',
    emergency_contact_name: 'Baz',
    emergency_contact_phone: '88888888',
    emergency_contact_relation: 'spouse',
    address: 'Downing Street 10',
    postal_code: '0000',
    city: 'XYZ'
  }
};

describe('Employee', () => {
  it('shows a spinner while loading', () => {
    const component = renderComponent(Employee, { employee: loadingEmployee });

    expect(component).to.have.class('loading-spinner');
  });

  it('shows information about selected employee', () => {
    const component = renderComponent(Employee, { employee });

    _.values(employee.data).map(v => expect(component).to.contain(v));
  });

  it('shows ‘not found’ if employee doesn\'t exist', () => {
    const component = renderComponent(Employee, { employee: { loading: false, data: null } });

    expect(component).to.contain('Not found');
  });

  it('generates link for phone number', () => {
    const component = renderComponent(Employee, { employee });

    expect(component.find('#phone-number')).to.have.attr('href', `tel:${employee.data.phone}`);
  });
});
