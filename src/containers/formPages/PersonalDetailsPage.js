import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { renderField } from './CustomFields';

const PersonalDetailsPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name='phone' type='text' component={renderField} label='Telefon' />
      <Field name='email' type='text' component={renderField} label='E-post' />
      <Field name='birth_date' type='text' component={renderField} label='00/00/00' />
      <Field name='date_of_employment' type='text' component={renderField} label='00/00/00' />
      <Field name='account_number' type='text' component={renderField} label='Kontonummer' />
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

PersonalDetailsPage.propTypes = {
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func
};

export default reduxForm({
  form: 'employeeForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true
})(PersonalDetailsPage);
