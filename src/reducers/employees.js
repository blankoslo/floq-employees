import { GET_EMPLOYEES } from '../actions/index';

import { loading, loaded } from '../loading';

export default (state = loading(), action) => {
  if (action.type === GET_EMPLOYEES) {
    return loaded(action.payload.data);
  }

  return state;
};
