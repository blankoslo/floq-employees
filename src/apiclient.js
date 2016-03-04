import axios from 'axios';
import { apiUrl } from '../config';

export const getEmployees = () => {
    return axios.get(`${apiUrl}/employees`);
};
