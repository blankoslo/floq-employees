// @flow

import axios from 'axios';
import { apiUrl } from '../config';

export const getEmployees = () =>
  axios.get(`${apiUrl}/employees?order=first_name.asc`);

export const updateEmployee = (id, updates) =>
  axios.patch(`${apiUrl}/employees?id=eq.${id}`, updates);

export const createEmployee = (data) =>
  axios.post(`${apiUrl}/employees`, data);
