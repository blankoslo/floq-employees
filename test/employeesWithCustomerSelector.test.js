import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { it, describe } from 'mocha';
import employeesWithCustomer from '../src/selectors/employeesWithCustomerSelector';

import { stateWithDataKeepTerminated, stateWithDataRemoveTerminated } from './state';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('employeesWithCustomerSelector(state, props)', () => {
  it('Sum of each split is correct when showing terminated employees', () => {
    const store = mockStore(stateWithDataKeepTerminated);
    const employees = employeesWithCustomer(store.getState());
    expect(employees.data.designers.size).equal(11);
    expect(employees.data.technologists.size).equal(28);
    expect(employees.data.other.size).equal(6);
  });

  it('Sum of each split is correct when filtering out terminated employees', () => {
    const store = mockStore(stateWithDataRemoveTerminated);
    const employees = employeesWithCustomer(store.getState());
    expect(employees.data.designers.size).equal(11 - 2);
    expect(employees.data.technologists.size).equal(28 - 6);
    expect(employees.data.other.size).equal(6);
  });
});
