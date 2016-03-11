// @flow

import { GET_EMPLOYEES } from '../actions/index';

export default (state = null, action) => {
  if (action.type === GET_EMPLOYEES) {
    return [...action.payload.data];
  }

  return state;
};
