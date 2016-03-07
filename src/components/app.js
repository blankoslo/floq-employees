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
