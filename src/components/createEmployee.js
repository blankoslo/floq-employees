import React from 'react';
import EmployeeEditor from './employeeEditor';

export default () => (
  <EmployeeEditor
    employee={{
      first_name: '',
      last_name: '',
      title: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      postal_code: '',
      city: '',
      birth_date: '',
      date_of_employment: '',
      termination_date: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      emergency_contact_relation: ''
    }}
  />
);
