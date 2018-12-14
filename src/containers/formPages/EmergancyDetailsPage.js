import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { renderField } from './CustomFields';

const EmergancyDetailsPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name='emergency_contact_name' type='text' component={renderField} label='Navn' />
      <Field name='emergency_contact_phone' type='text' component={renderField} label='Telefon' />
      <Field
        name='emergency_contact_relation'
        type='text'
        component={renderField}
        label='Relasjon'
      />
      <Field name='address' type='text' component={renderField} label='Adresse' />
      <Field name='postal_code' type='text' component={renderField} label='Postnr.' />
      <Field name='city' type='text' component={renderField} label='Sted' />
      <div>
        <button type='button' className='previous' onClick={previousPage}>
          Tilbake
        </button>
        <button type='submit' className='next'>
          Next
        </button>
      </div>
    </form>
  );
};

EmergancyDetailsPage.propTypes = {
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func
};

export default reduxForm({
  form: 'employeeForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(EmergancyDetailsPage);
