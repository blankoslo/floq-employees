import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm, startSubmit, stopSubmit, destroy } from 'redux-form';
import { updateEmployee, createEmployee } from '../../apiclient';
import { toggleEmployeeEditor, getEmployees } from '../../actions/index';

/* eslint no-unused-vars: 0 */
import regeneratorRuntime from 'regenerator-runtime';
/* eslint no-unused-vars: 1 */

import { TextInput, InputLabel, TextArea } from './CustomFields';
import PagingAndSubmitControls from './PagingAndSubmitControls';

const TriviaDetialsPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-page_fields'>
        <InputLabel labelText='Hvem er du?'>
          <Field name='bio' component={TextArea} label={'?\n??\n???'} />
        </InputLabel>
        <InputLabel labelText='Din personlige emoji'>
          <Field name='emoji' type='text' component={TextInput} label='🦐' />
        </InputLabel>
        <InputLabel labelText='Din personlige tittel'>
          <Field name='title' type='text' component={TextInput} label='CEO? Snapchatter?' />
        </InputLabel>
      </div>
      <PagingAndSubmitControls previousPage={previousPage} isFormSubmit />
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
      .catch(() => {
        dispatch(stopSubmit('employeeeForm'));
      });
  }

  return createEmployee(employeeData)
    .then(onSuccessfulSubmit(dispatch))
    .catch(() => {
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
