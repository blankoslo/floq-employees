import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectEmployee } from '../actions/index';
import selectedEmployeeSelector from '../selectors/selectedEmployee';

class EmployeeContainer extends Component {
  constructor(props) {
    super(props);

    // dispatch a SELECT_EMPLOYEE in case there is no active employee for the
    // initial render
    if (props.params.id !== undefined) {
      const selectedId = parseInt(props.params.id);
      props.dispatch(selectEmployee(selectedId));
    }
  }

  componentWillReceiveProps(props) {
    if (props.params.id !== undefined) {
      const selectedId = parseInt(props.params.id);
      props.dispatch(selectEmployee(selectedId));
    }
  }

  render() {
    // pass `employee` prop to children
    return React.cloneElement(this.props.children, {
      employee: this.props.selected_employee
    });
  }
}

EmployeeContainer.propTypes = {
  selected_employee: React.PropTypes.object,
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  params: React.PropTypes.object
};

const mapStateToProps = (state) => ({
  selected_employee: selectedEmployeeSelector(state)
});

export default connect(mapStateToProps)(EmployeeContainer);
