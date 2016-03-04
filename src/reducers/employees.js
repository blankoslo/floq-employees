import {GET_EMPLOYEES} from '../actions/index';

export default (state = null, action) => {
    console.log('Action received', action);

    if (action.type == GET_EMPLOYEES) {
        return action.payload.data;
    }

    return state;
};
