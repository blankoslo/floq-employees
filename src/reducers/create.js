import { NEW_EMPLOYEE } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case NEW_EMPLOYEE:
      return action.payload;
    default:
      return state;
  }
};
