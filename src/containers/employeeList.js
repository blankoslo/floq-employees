import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeCard from "./employeeCard";
import Spinner from "../components/spinner";
import { newEmployee, toggleShowTerminated } from "../actions/index";
import Toggle from "material-ui/Toggle";
import employeeWithAssignedCustomerSelector from "../selectors/employeesWithCustomer";

const RoleColumn = ({ roleTitle, data }) => {
  const cards = data
    .valueSeq()
    .map(employee => <EmployeeCard key={employee.id} employee={employee} />);
  return (
    <div className="role-column">
      <h5 className="role-column__title">{roleTitle}</h5>
      <hr className="role-column__horizontal-line" />
      {cards}
    </div>
  );
};

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInactiveEmployees: false
    };
  }

  setNew = value => {
    this.props.newEmployee(value);
  };

  toggleShowInactiveEmployees = (event, isInputChecked) => {
    this.setState({ showInactiveEmployees: isInputChecked });
  };

  render() {
    if (this.props.employees.loading) {
      return <Spinner />;
    }

    return (
      <div className="floq-list">
        <div className="floq-list-header">
          <button
            onClick={() => {
              this.setNew(!this.props.creatingEmployee);
            }}
            id="add-employee-button"
            className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"
          >
            <i className="material-icons dark-gray">
              {this.props.creatingEmployee ? "clear" : "add"}
            </i>
          </button>
          <div>
            <Toggle label="Inkluder tidligere ansatte" onToggle={this.props.toggleShowTerminated} />
          </div>
        </div>
        <div className="floq-cards">
          {this.props.creatingEmployee ? <EmployeeCard employee={null} /> : null}
          <RoleColumn data={this.props.employees.data.designers} roleTitle={"Designere"} />
          <RoleColumn data={this.props.employees.data.technologists} roleTitle={"Teknologer"} />
          <RoleColumn data={this.props.employees.data.other} roleTitle={"Administrasjon ++"} />
        </div>
      </div>
    );
  }
}

EmployeeList.propTypes = {
  employees: React.PropTypes.object.isRequired,
  newEmployee: React.PropTypes.func,
  creatingEmployee: React.PropTypes.bool
};

const mapStateToProps = (state, props) => {
  return {
    creatingEmployee: state.creatingEmployee,
    employees: employeeWithAssignedCustomerSelector(state, props)
  };
};

const mapDispatchToProps = {
  newEmployee,
  toggleShowTerminated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeList);
