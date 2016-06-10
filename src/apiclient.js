import axios_ from 'axios';

const axios = axios_.create({
  baseURL: window.config && window.config.apiUri
             ? window.config.apiUri
             : 'http://192.81.222.35:3001',
  headers: {
    Authorization: `Bearer ${window.apiToken}`, // from `intranet` app
    Prefer: 'return=representation' // ask for the updated entity after modifications (e.g. PATCH)
  }
});

export const getEmployees = () =>
  axios.get('/employees');

export const updateEmployee = (id, updates) =>
  axios.patch(`/employees?id=eq.${id}`, updates);

export const createEmployee = (data) =>
  axios.post('/employees', data);
