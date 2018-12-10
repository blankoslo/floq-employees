import PropTypes from 'prop-types';
import React from 'react';
import EditEmployee from './editEmployee';

const CreateEmployee = (props) => (
  <EditEmployee
    onSubmit={props.onSubmit}
    onChange={props.onChange}
    onCancel={props.onCancel}
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
      emergency_contact_relation: '',
      image_url: ''
    }}
  />
);

CreateEmployee.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onCancel: PropTypes.func
};

export default CreateEmployee;
