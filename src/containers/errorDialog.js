import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { clearApiError } from '../actions';

const statusErrorMessages = new Map([
  [400, 'Bad Request'],
  [401, 'Unautherized'],
  [404, 'Not found'],
  [500, 'Internal Server Error']
]);

const ErrorDialog = ({ status, message, exitDialog }) => (
  <div className="error-overlay" onClick={() => exitDialog()}>
    <div className="error-dialog">
      <i className="material-icons error-dialog__icon">sentiment_very_dissatisfied</i>
      {status && <h5 className="error-dialog__status_code">{status}</h5>}
      {status && (
        <span className="error-dialog__status_message">{statusErrorMessages.get(status)}</span>
      )}
      {message && <span className="error-dialog__description">{message}</span>}
    </div>
  </div>
);

ErrorDialog.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  exitDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  status: state.error.data.status,
  message: state.error.data.message
});

export default connect(
  mapStateToProps,
  { exitDialog: clearApiError }
)(ErrorDialog);
