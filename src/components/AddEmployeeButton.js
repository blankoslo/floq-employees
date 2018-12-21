import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setEmployeeEditorInitialValues, toggleEmployeeEditor } from '../actions/index';

const AddEmployeeButton = ({ displayEmployeeEditor, createNewEmployee }) => (
  <div className='add-employee-button'>
    <button
      onClick={createNewEmployee}
      className='add-employee-button__button mdl-button mdl-js-button mdl-button--fab'
    >
      <i className='material-icons white'>{displayEmployeeEditor ? 'clear' : 'add'}</i>
    </button>
  </div>
);

AddEmployeeButton.propTypes = {
  displayEmployeeEditor: PropTypes.bool,
  createNewEmployee: PropTypes.func
};

const mapStateToProps = state => ({
  displayEmployeeEditor: state.edit.displayEmployeeEditor
});

const mapDispatchToProps = dispatch => ({
  createNewEmployee: () => {
    dispatch(setEmployeeEditorInitialValues({}));
    dispatch(toggleEmployeeEditor());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEmployeeButton);
