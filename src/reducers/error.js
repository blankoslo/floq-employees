import { API_ERROR, API_ERROR_CLEAR } from '../actions/index';

export default (state = { data: null, showErrorDialog: false }, action) => {
  switch (action.type) {
    case API_ERROR:
      return {
        ...state,
        showErrorDialog: true,
        data: action.payload
      };
    case API_ERROR_CLEAR:
      return {
        ...state,
        showErrorDialog: false,
        data: null
      };
    default:
      return state;
  }
};
