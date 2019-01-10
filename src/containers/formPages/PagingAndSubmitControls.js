import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

const PagingAndSubmitControls = ({ isFormSubmit, previousPage }) => {
  const buttonClassName = 'form_paging_and_submit-controls__button';
  const submitClassName = 'form_paging_and_submit-controls__button_submit';
  const previousClassName = 'form_paging_and_submit-controls__button_previous';

  return (
    <div className="form_paging_and_submit-controls">
      {previousPage ? (
        <button
          type="button"
          className={classNames(buttonClassName, previousClassName)}
          onClick={previousPage}
        >
          Tilbake
        </button>
      ) : (
        undefined
      )}
      <button type="submit" className={classNames(buttonClassName, submitClassName)}>
        {isFormSubmit ? 'Ferdig' : 'Neste'}
      </button>
    </div>
  );
};

PagingAndSubmitControls.propTypes = {
  isFormSubmit: PropTypes.bool,
  previousPage: PropTypes.func
};

PagingAndSubmitControls.defaultProps = {
  previousPage: null,
  isFormSubmit: false
};

export default PagingAndSubmitControls;
