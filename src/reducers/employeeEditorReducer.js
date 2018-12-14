import { TOGGLE_EMPLOYEE_EDITOR, SET_EMPLOYEE_EDITOR_INITIAL_VALUES } from '../actions';

export default (state = { displayEmployeeEditor: true, initialValues: {} }, action) => {
  switch (action.type) {
    case TOGGLE_EMPLOYEE_EDITOR:
      return {
        ...state,
        displayEmployeeEditor: !state.displayEmployeeEditor
      };
    case SET_EMPLOYEE_EDITOR_INITIAL_VALUES:
      return {
        ...state,
        initialValues: action.payload
      };
    default:
      return state;
  }
};
