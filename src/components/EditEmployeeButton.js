import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setEmployeeEditorInitialValues, toggleEmployeeEditor } from '../actions/index';

const EditEmployeeButton = ({ employeeData, editEmployee }) => (
  <div className='floq-edit-employee-button' onClick={() => editEmployee(employeeData)}>
    <i className='floq-edit-employee-button__icon' />
  </div>
);

EditEmployeeButton.propTypes = {
  employeeData: PropTypes.object,
  editEmployee: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  employeeData: state.employees.data.get(props.id)
});

const mapDispatchToProps = dispatch => ({
  editEmployee: employeeData => {
    dispatch(setEmployeeEditorInitialValues(employeeData));
    dispatch(toggleEmployeeEditor());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmployeeButton);
