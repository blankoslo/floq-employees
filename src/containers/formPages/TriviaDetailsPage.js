import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm, startSubmit, stopSubmit, destroy } from 'redux-form';
import { updateEmployee, createEmployee } from '../../apiclient';
import { toggleEmployeeEditor, getEmployees } from '../../actions/index';

/* eslint no-unused-vars: 0 */
import regeneratorRuntime from 'regenerator-runtime';
/* eslint no-unused-vars: 1 */

import { renderField } from './CustomFields';

const TriviaDetialsPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name='bio_1' type='text' component={renderField} label='?' />
      <Field name='bio_2' type='text' component={renderField} label='??' />
      <Field name='bio_3' type='text' component={renderField} label='???' />
      <Field name='emoji' type='text' component={renderField} label='🦐' />
      <Field name='personal_title' type='text' component={renderField} label='CEO? Snapchatter?' />
      <div>
        <button type='button' className='previous' onClick={previousPage}>
          Tilbake
        </button>
        <button type='submit' className='next'>
          Ferdig
        </button>
      </div>
    </form>
  );
};

TriviaDetialsPage.propTypes = {
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func
};

const onSuccessfulSubmit = async dispatch => {
  dispatch(getEmployees());
  dispatch(toggleEmployeeEditor());
  dispatch(stopSubmit('employeeForm'));
  dispatch(destroy('employeeForm'));
};

const submitEmployeeForm = (employeeData, dispatch) => {
  dispatch(startSubmit('employeeForm'));

  if (employeeData.id) {
    const modifiedEmployeeData = { ...employeeData };
    delete modifiedEmployeeData.id;
    return updateEmployee(employeeData.id, modifiedEmployeeData)
      .then(onSuccessfulSubmit(dispatch))
      .catch(e => {
        dispatch(stopSubmit('employeeeForm'));
      });
  }

  return createEmployee(employeeData)
    .then(onSuccessfulSubmit(dispatch))
    .catch(e => {
      dispatch(stopSubmit('employeeeForm'));
    });
};

export default reduxForm({
  form: 'employeeForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true,
  onSubmit: submitEmployeeForm
})(TriviaDetialsPage);
