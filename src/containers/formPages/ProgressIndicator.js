import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

const ProgressLegend = ({ currentPage, legendPage, legendText }) => {
  const className = classNames('form_progress_indicator__progress_legend',
    { 'form_progress_indicator__progress_legend--past': legendPage < currentPage },
    { 'form_progress_indicator__progress_legend--current': currentPage === legendPage },
    { 'form_progress_indicator__progress_legend--future': legendPage > currentPage }
  );
  return (<div className='form_progress_legend'>
    {currentPage === legendPage && <a className='form_progress_legend__text'>{legendText}</a>}
    <div className={className} />
  </div>);
};

ProgressLegend.propTypes = {
  currentPage: PropTypes.number,
  legendPage: PropTypes.number,
  legendText: PropTypes.string
};

export const ProgressIndicator = ({ currentPage }) => (<div className='form_progress_indicator'>
  <ProgressLegend currentPage={currentPage} legendPage={1} legendText={'Basic'} />
  <ProgressLegend currentPage={currentPage} legendPage={2} legendText={'Personal'} />
  <ProgressLegend currentPage={currentPage} legendPage={3} legendText={'Emergancy'} />
  <ProgressLegend currentPage={currentPage} legendPage={4} legendText={'Trivia'} />
</div>);

ProgressIndicator.propTypes = {
  currentPage: PropTypes.number
};
