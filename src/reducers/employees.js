import * as _ from 'lodash';

import { GET_EMPLOYEES, CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from '../actions/index';
import { getValue, loading, loaded } from '../loading';

export default (state = loading(), action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return loaded(_.sortBy(action.payload.data, ['first_name', 'last_name']));
    case CREATE_EMPLOYEE:
      return loaded(
        _.sortBy(
          _.unionBy(action.payload.data, getValue(state), e => e.id),
          ['first_name', 'last_name']
      ));
    case UPDATE_EMPLOYEE:
      return loaded(
        _.sortBy(
          _.unionBy(action.payload.data, getValue(state), e => e.id),
          ['first_name', 'last_name']
      ));
    default:
      return state;
  }
};
