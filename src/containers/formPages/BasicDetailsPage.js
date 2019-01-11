import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

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
    label: 'Annet',
    value: 'other'
  }
];

const BasicDetailsPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-page-fields">
        <h1 className="form-page-fields__basic-details-header">
          Fortell oss
          <br />
          litt om deg
        </h1>
        <span className="form-page-fields__intro-text">Først litt formelle ting</span>
        <InputLabel labelText="Navn">
          <Field
            name="first_name"
            type="text"
            component={TextInput}
            label="Fornavn"
            validate={[required]}
          />
          <Field
            name="last_name"
            type="text"
            component={TextInput}
            label="Etternavn"
            validate={[required]}
          />
        </InputLabel>
        <Field
          options={roleOptions}
          name="role"
          type="button"
          component={ButtonGroup}
          validate={[required]}
        />
        <Field
          options={genderOptions}
          name="gender"
          type="button"
          component={ButtonGroup}
          validate={[required]}
        />
      </div>
      <PagingAndSubmitControls />
    </form>
  );
};

BasicDetailsPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'employeeForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(BasicDetailsPage);
