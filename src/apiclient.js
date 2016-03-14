// @flow

import axios_ from 'axios';
import { apiUrl } from '../config';

const axios = axios_.create({
  baseURL: apiUrl
});

export const getEmployees = () =>
  axios.get(`/employees?order=first_name.asc`);

export const updateEmployee = (id, updates) =>
  axios.patch(`/employees?id=eq.${id}`, updates);

export const createEmployee = (data) =>
  axios.post(`/employees`, data);
