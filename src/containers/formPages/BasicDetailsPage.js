import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { TextInput, ButtonGroup, InputLabel } from './CustomFields';
import PagingAndSubmitControls from './PagingAndSubmitControls';
import { required } from './fieldValidators';

const roleOptions = [
  {
    label: 'Teknolog',
    value: 'Teknolog'
  },
  {
    label: 'Designer',
    value: 'Designer'
  },
  {
    label: 'Annet',
    value: 'Annet'
  }
];

const genderOptions = [
  {
    label: 'Kvinne',
    value: 'female'
  },
  {
    label: 'Mann',
    value: 'male'
  },
  {
    label: '🌳',
    value: 'other'
  }
];

const BasicDetailsPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-page_fields'>
        <InputLabel labelText={'Navn'}>
          <Field
            name='first_name'
            type='text'
            component={TextInput}
            label='Fornavn'
            validate={[required]}
          />
          <Field
            name='last_name'
            type='text'
            component={TextInput}
            label='Etternavn'
            validate={[required]}
          />
        </InputLabel>
        <Field
          options={roleOptions}
          name='role'
          type='button'
          component={ButtonGroup}
          validate={[required]}
        />
        <Field
          options={genderOptions}
          name='gender'
          type='button'
          component={ButtonGroup}
          validate={[required]}
        />
      </div>
      <PagingAndSubmitControls />
    </form>
  );
};

BasicDetailsPage.propTypes = {
  handleSubmit: PropTypes.func
};

export default connect(state => ({
  initialValues: state.edit.initialValues
}))(
  reduxForm({
    form: 'employeeForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
  })(BasicDetailsPage)
);
