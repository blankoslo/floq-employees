import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { TextInput, InputLabel } from './CustomFields';
import PagingAndSubmitControls from './PagingAndSubmitControls';
import { required, phone, email } from './fieldValidators';

const PersonalDetailsPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-page-fields'>
        <InputLabel labelText={'Kontaktopplysninger'}>
          <Field
            name='phone'
            type='text'
            component={TextInput}
            label='Telefon'
            validate={[required, phone]}
          />
          <Field
            name='email'
            type='text'
            component={TextInput}
            label='E-post'
            validate={[required, email]}
          />
        </InputLabel>
        <InputLabel labelText={'Fødselsdato'}>
          <Field
            name='birth_date'
            type='date'
            component={TextInput}
            label='00/00/00'
            validate={[required]}
          />
        </InputLabel>
        <InputLabel labelText={'Ansettelsedato'}>
          <Field name='date_of_employment' type='date' component={TextInput} label='00/00/00' />
        </InputLabel>
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
  forceUnregisterOnUnmount: true
})(PersonalDetailsPage);
