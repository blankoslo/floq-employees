import * as api from '../apiclient';

export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';

export const getEmployees = () => {
    return {
        type: GET_EMPLOYEES,
        payload: api.getEmployees()
    };
};

export const createEmployee = props => {
    return {
        type: CREATE_EMPLOYEE,
        payload: api.createEmployee(props)
    };
};
