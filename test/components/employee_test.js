/* eslint-disable no-unused-expressions */

import { renderComponent, expect } from '../testhelper';
import Employee from '../../src/components/employee';

const loadingEmployee = {
  loading: true,
  data: null
};

describe('Employee', () => {
  it('shows a spinner while loading', () => {
    const component = renderComponent(Employee, { employee: loadingEmployee });

    expect(component).to.have.class('loading-spinner');
  });

  it('shows ‘not found’ if employee doesn\'t exist', () => {
    const component = renderComponent(Employee, { employee: { loading: false, data: null } });

    expect(component).to.contain('Not found');
  });
});
