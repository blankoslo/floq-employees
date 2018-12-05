import * as Immutable from "immutable";

import {
  GET_EMPLOYEES,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  TOGGLE_REMOVE_TERMINATED
} from "../actions/index";

const lowerCaseName = e => `${e.first_name}${e.last_name}`.toLowerCase();

const initialState = { loading: true, data: new Immutable.Map(), removeTerminated: true };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        loading: false,
        data: new Immutable.OrderedMap(action.payload.data.map(e => [e.id, e])).sortBy(
          lowerCaseName
        )
      };
    case CREATE_EMPLOYEE:
      return {
        ...state,
        loading: false,
        data: state.data.set(action.payload.data.id, action.payload.data).sortBy(lowerCaseName)
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        loading: false,
        // we get back a list of results since (conceptually) several entities might have been
        // updated. fold over the updated entities and update the current list.
        data: action.payload.data
          .reduce((acc, e) => acc.set(e.id, e), state.data)
          .sortBy(lowerCaseName)
      };
    case TOGGLE_REMOVE_TERMINATED:
      return {
        ...state,
        removeTerminated: !state.removeTerminated
      };
    default:
      return state;
  }
};
