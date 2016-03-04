import * as api from '../apiclient';

export const GET_EMPLOYEES = 'GET_EMPLOYEES';

export const getEmployees = () => {
    console.log('Sending request', api);

    return {
        type: GET_EMPLOYEES,
        payload: api.getEmployees()
    };
};
