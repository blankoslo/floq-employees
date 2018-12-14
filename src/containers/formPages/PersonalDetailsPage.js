import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { TextInput } from './CustomFields';
import PagingAndSubmitControls from './PagingAndSubmitControls';

const PersonalDetailsPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-page_fields'>
        <Field name='phone' type='text' component={TextInput} label='Telefon' />
        <Field name='email' type='text' component={TextInput} label='E-post' />
        <Field name='birth_date' type='text' component={TextInput} label='00/00/00' />
        <Field name='date_of_employment' type='text' component={TextInput} label='00/00/00' />
        <Field name='account_number' type='text' component={TextInput} label='Kontonummer' />
      </div>
      <PagingAndSubmitControls previousPage={previousPage} />
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
