import React, { Component } from "react";
import { connect } from "react-redux";

import Employee from "../components/employee2";
import EmployeeExpanded from "../components/employeeExpanded";
import EmployeeForm from "./employeeForm";
import { editEmployee } from "../actions/index";

class EmployeeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  setEdit = () => {
    this.props.editEmployee(this.props.employee.id);
  };

  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    if (this.props.employee === null || this.props.edit === this.props.employee.id) {
      return <EmployeeForm employee={this.props.employee} form={null} />;
    } else if (this.state.expanded === true) {
      return (
        <EmployeeExpanded
          employee={this.props.employee}
          onEdit={this.setEdit}
          onExpand={this.toggleExpand}
        />
      );
    }
    return (
      <Employee employee={this.props.employee} onEdit={this.setEdit} onExpand={this.toggleExpand} />
    );
  }
}

EmployeeCard.propTypes = {
  employee: React.PropTypes.object,
  editEmployee: React.PropTypes.func,
  edit: React.PropTypes.string
};

const mapStateToProps = state => ({
  edit: state.edit
});

const mapDispatchToProps = {
  editEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeCard);
