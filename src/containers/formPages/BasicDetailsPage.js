import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderField, TitleSelect } from './CustomFields';

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
      <Field name='first_name' type='text' component={renderField} label='First Name' />
      <Field name='last_name' type='text' component={renderField} label='Last Name' />
      <Field options={titleOptions} name='title' type='button' component={TitleSelect} />
      <Field options={genderOptions} name='gender' type='button' component={TitleSelect} />
      <div>
        <button type='submit' className='next'>
          Next
        </button>
      </div>
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
