// @flow

import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEmployees } from '../actions/index';

class App extends Component {
  componentWillMount() {
    this.props.getEmployees();
  }

  render() {
    // Show a spinner until we get employees data
    if (this.props.employees === null) {
      return (
        <div style={ { width: '100%', margin: '15px', textAlign: 'center' } }>
          <div className="mdl-spinner mdl-js-spinner is-active" />
        </div>
      );
    }

    return (
      <div className='main-content'>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = ({ employees }) => ({
  employees: employees
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getEmployees: getEmployees }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
