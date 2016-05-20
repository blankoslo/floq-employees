import * as _ from 'lodash';

import { GET_EMPLOYEES, CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from '../actions/index';

export default (state = { loading: true, data: [] }, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        loading: false,
        data: _.sortBy(action.payload.data, ['first_name', 'last_name'])
      };
    case CREATE_EMPLOYEE:
    case UPDATE_EMPLOYEE:
      return {
        loading: false,
        data: _.sortBy(
          _.unionBy(action.payload.data, state, e => e.id),
          ['first_name', 'last_name']
        )
      };
    default:
      return state;
  }
};
