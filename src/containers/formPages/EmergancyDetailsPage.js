import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { TextInput, InputLabel } from './CustomFields';
import PagingAndSubmitControls from './PagingAndSubmitControls';

const EmergancyDetailsPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-page-fields">
        <span className="form-page-fields__intro-text">Dersom det skjer noe...</span>
        <InputLabel labelText="Kontaktperson">
          <Field name="emergency_contact_name" type="text" component={TextInput} label="Navn" />
          <Field name="emergency_contact_phone" type="text" component={TextInput} label="Telefon" />
          <Field
            name="emergency_contact_relation"
            type="text"
            component={TextInput}
            label="Relasjon"
          />
        </InputLabel>
        <InputLabel labelText="Hvor bor du?">
          <Field name="address" type="text" component={TextInput} label="Adresse" />
          <Field name="postal_code" type="text" component={TextInput} label="Postnr." />
          <Field name="city" type="text" component={TextInput} label="Sted" />
        </InputLabel>
      </div>
      <PagingAndSubmitControls previousPage={previousPage} />
    </form>
  );
};

EmergancyDetailsPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'employeeForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(EmergancyDetailsPage);
