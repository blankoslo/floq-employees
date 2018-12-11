import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import EmployeeList from '../src/containers/employeeList';
import EmployeeCard from '../src/containers/employeeCard';
import Spinner from '../src/components/spinner';

import {
  stateWithoutData,
  stateWithDataKeepTerminated,
  stateWithDataRemoveTerminated
} from './state';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('<EmployeeList /> container', () => {
  it('Spinner is loaded when in fetching state', () => {
    const store = mockStore(stateWithoutData);
    const wrapper = mount(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );
    expect(wrapper.contains(<Spinner />)).to.equal(true);
  });

  it('Is rendering <EmployeeCard /> for non-terminated employees', () => {
    const store = mockStore(stateWithDataRemoveTerminated);
    const wrapper = mount(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );
    expect(wrapper.find(EmployeeCard)).to.have.lengthOf(46 - 9);
  });

  it('Is rendering <EmployeeCard /> for all employees', () => {
    const store = mockStore(stateWithDataKeepTerminated);
    const wrapper = mount(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );
    expect(wrapper.find(EmployeeCard)).to.have.lengthOf(46);
  });

  //   it("Is rendering three <RoleColumn /> (");
});
