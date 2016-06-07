import * as Immutable from 'immutable';

import { GET_EMPLOYEES, CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from '../actions/index';

const lowerCaseName = e => `${e.first_name}${e.last_name}`.toLowerCase();

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.data.map(e => [e.id, e]))
            .sortBy(lowerCaseName)
      };
    case CREATE_EMPLOYEE:
    case UPDATE_EMPLOYEE:
      return {
        loading: false,
        // we get back a list of results since (conceptually) several entities might have been
        // updated. fold over the updated entities and update the current list.
        data: action.payload.data.reduce(
          (acc, e) => acc.set(e.id, e),
          state.data
        ).sortBy(lowerCaseName)
      };
    default:
      return state;
  }
};
