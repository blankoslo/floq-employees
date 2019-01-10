import { UPDATE_SEARCH_TERMS } from '../actions/index';

const initialState = {
  terms: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_TERMS:
      return {
        ...state,
        terms: action.payload
      };
    default:
      return state;
  }
};
