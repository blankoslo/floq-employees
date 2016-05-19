import * as _ from 'lodash';

import { FORM_RESET, FORM_UPDATE_VALUE } from '../actions';

export const FormReducer = (state = null, action) => {
  switch (action.type) {
    case FORM_UPDATE_VALUE:
      return _.merge({}, state, action.payload);
    case FORM_RESET:
      return {};
    default:
      return state;
  }
};
