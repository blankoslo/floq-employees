import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { TextInput, ButtonGroup } from './CustomFields';
import PagingAndSubmitControls from './PagingAndSubmitControls';

const titleOptions = [
  {
    label: 'Teknolog',
    value: 'technologist'
  },
  {
    label: 'Designer',
    value: 'designer'
  },
  {
    label: 'Annet*',
    value: 'other'
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
    value: 'annet'
  }
];

const BasicDetailsPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-page_fields'>
        <Field name='first_name' type='text' component={TextInput} label='Fornavn' />
        <Field name='last_name' type='text' component={TextInput} label='Etternavn' />
        <Field options={titleOptions} name='title' type='button' component={ButtonGroup} />
        <Field options={genderOptions} name='gender' type='button' component={ButtonGroup} />
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
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(BasicDetailsPage)
);
