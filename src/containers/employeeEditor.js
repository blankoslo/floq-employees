import React from 'react';
import BasicDetailsPage from './formPages/BasicDetailsPage';
import PersonalDetailsPage from './formPages/PersonalDetailsPage';
import EmergancyDetailsPage from './formPages/EmergancyDetailsPage';
import TriviaDetailsPage from './formPages/TriviaDetailsPage';

export default class EmployeeEditor extends React.Component {
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
    // const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div className='floq-employee-editor'>
        <div>
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
