import { EDIT_EMPLOYEE } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case EDIT_EMPLOYEE:
      return action.payload;
    default:
      return state;
  }
};
