import propTypes from 'prop-types';
import React from 'react';
import BasicDetailsPage from './formPages/BasicDetailsPage';
import PersonalDetailsPage from './formPages/PersonalDetailsPage';
import EmergancyDetailsPage from './formPages/EmergancyDetailsPage';
import TriviaDetailsPage from './formPages/TriviaDetailsPage';
import { Field, reduxForm } from 'redux-form';

import Images from '../components/images';

class EmployeeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  render() {
    const { handleSubmit } = this.props;
    const { page } = this.state;
    return (
      <div className='floq-employee-editor'>
        <div>
          <form onSubmit={handleSubmit}>
            <Field name='image_url' type='file' component={Images} />
          </form>
        </div>
        <div className='floq-employee-editor__page'>
          {page === 1 && <BasicDetailsPage onSubmit={this.nextPage} />}
          {page === 2 && (
            <PersonalDetailsPage previousPage={this.previousPage} onSubmit={this.nextPage} />
          )}
          {page === 3 && (
            <EmergancyDetailsPage previousPage={this.previousPage} onSubmit={this.nextPage} />
          )}
          {page === 4 && <TriviaDetailsPage previousPage={this.previousPage} />}
        </div>
      </div>
    );
  }
}

EmployeeEditor.propTypes = {
  handleSubmit: propTypes.func
};

export default reduxForm({
  form: 'employeeForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true
})(EmployeeEditor);
