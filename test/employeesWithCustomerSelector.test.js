import { expect } from "chai";
import configureStore from "redux-mock-store";
import employeesWithCustomer from "../src/selectors/employeesWithCustomerSelector";

import {
  stateWithoutData,
  stateWithDataKeepTerminated,
  stateWithDataRemoveTerminated
} from "./state";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("employeesWithCustomerSelector(state, props)", () => {
  it("Sum of each split is correct when showing terminated employees", () => {
    const store = mockStore(stateWithDataKeepTerminated);
    const employees = employeesWithCustomer(store.getState());
    expect(employees.data.designers.size).equal(10);
    expect(employees.data.technologists.size).equal(22);
    expect(employees.data.other.size).equal(store.getState().employees.data.size - 32);
  });

  it("Sum of each split is correct when filtering out terminated employees", () => {
    const store = mockStore(stateWithDataRemoveTerminated);
    const employees = employeesWithCustomer(store.getState());
    expect(employees.data.designers.size).equal(10 - 2);
    expect(employees.data.technologists.size).equal(22 - 4);
    expect(employees.data.other.size).equal(store.getState().employees.data.size - 32 - 3);
  });
});
