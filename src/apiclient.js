import axios from 'axios';
import { apiUrl } from '../config';

export const getEmployees = () => {
    return axios.get(`${apiUrl}/employees?order=first_name.asc`);
};

export const createEmployee = (data) => {
    return axios.post(`${apiUrl}/employees`, data);
}
