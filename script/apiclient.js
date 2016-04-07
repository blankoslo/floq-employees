// @flow

import axios_ from 'axios';

const axios = axios_.create({
  baseURL: window.config.apiUri || 'http://192.81.222.35:3001',
  headers: {
    Authorization: `Bearer ${window.apiToken}` // from `intranet` app
  }
});

export const getEmployees = () =>
  axios.get('/employees?order=first_name.asc');

export const updateEmployee = (id, updates) =>
  axios.patch(`/employees?id=eq.${id}`, updates);

export const createEmployee = (data) =>
  axios.post('/employees', data);
