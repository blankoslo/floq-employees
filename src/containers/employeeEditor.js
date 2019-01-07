import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import BasicDetailsPage from './formPages/BasicDetailsPage';
import PersonalDetailsPage from './formPages/PersonalDetailsPage';
import EmergancyDetailsPage from './formPages/EmergancyDetailsPage';
import TriviaDetailsPage from './formPages/TriviaDetailsPage';
import { Field, reduxForm } from 'redux-form';

import Images from '../components/images';

const ProgressLegend = ({ currentPage, legendPage, legendText }) => {
  const className = classNames(
    'form_progress_indicator__progress_legend',
    { 'form_progress_indicator__progress_legend--past': legendPage < currentPage },
    { 'form_progress_indicator__progress_legend--current': currentPage === legendPage },
    { 'form_progress_indicator__progress_legend--future': legendPage > currentPage }
  );
  return (
    <div className='form_progress_legend'>
      {currentPage === legendPage && <a className='form_progress_legend__text'>{legendText}</a>}
      <div className={className} />
    </div>
  );
};

ProgressLegend.propTypes = {
  currentPage: PropTypes.number,
  legendPage: PropTypes.number,
  legendText: PropTypes.string
};

const ProgressIndicator = ({ currentPage }) => (
  <div className='form_progress_indicator'>
    <ProgressLegend currentPage={currentPage} legendPage={1} legendText={'Basic'} />
    <ProgressLegend currentPage={currentPage} legendPage={2} legendText={'Personal'} />
    <ProgressLegend currentPage={currentPage} legendPage={3} legendText={'Emergancy'} />
    <ProgressLegend currentPage={currentPage} legendPage={4} legendText={'Trivia'} />
  </div>
);

ProgressIndicator.propTypes = {
  currentPage: PropTypes.number
};

class EmployeeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  previousPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };

  render() {
    const { handleSubmit } = this.props;
    const { currentPage } = this.state;
    return (
      <div className='floq-employee-editor-overlay'>
        <div className='floq-employee-editor'>
          <div className='floq-employee-editor__image-upload'>
            <form onSubmit={handleSubmit}>
              <Field name='image_url' type='file' component={Images} />
            </form>
          </div>
          <div className='floq-employee-editor__page'>
            <ProgressIndicator currentPage={currentPage} />
            {currentPage === 1 && <BasicDetailsPage onSubmit={this.nextPage} />}
            {currentPage === 2 && (
              <PersonalDetailsPage previousPage={this.previousPage} onSubmit={this.nextPage} />
            )}
            {currentPage === 3 && (
              <EmergancyDetailsPage previousPage={this.previousPage} onSubmit={this.nextPage} />
            )}
            {currentPage === 4 && <TriviaDetailsPage previousPage={this.previousPage} />}
          </div>
        </div>
      </div>
    );
  }
}

EmployeeEditor.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'employeeForm',
  destroyOnUnmount: true
})(EmployeeEditor);
