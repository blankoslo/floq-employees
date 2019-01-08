import PropTypes from 'prop-types';
import React from 'react';
import BasicDetailsPage from './formPages/BasicDetailsPage';
import PersonalDetailsPage from './formPages/PersonalDetailsPage';
import EmergancyDetailsPage from './formPages/EmergancyDetailsPage';
import TriviaDetailsPage from './formPages/TriviaDetailsPage';
import { Field, reduxForm } from 'redux-form';

import Images from '../components/images';
import { ProgressIndicator } from './formPages/ProgressIndicator';

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
