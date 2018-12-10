import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeCard from "./employeeCard";
import Spinner from "../components/spinner";
import { newEmployee, toggleShowTerminated } from "../actions/index";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import employeeWithAssignedCustomerSelector from "../selectors/employeesWithCustomer";

const RoleColumn = ({ roleTitle, data }) => {
  const cardsData = data.valueSeq();
  return (
    <div className="role-column">
      <h5 className="role-column__title">{roleTitle}</h5>
      <hr className="role-column__horizontal-line" />
      {cardsData.map(employee => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      value: ""
    };
  }

  onSearchFieldClick = e => {
    this.inputRef.current.focus();
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div className="floq-search-field" onClick={this.onSearchFieldClick}>
        <i className="floq-search-field__icon material-icons dark-gray">{"search"}</i>
        <input
          ref={this.inputRef}
          type="text"
          className="floq-search-field__input"
          placeholder="Søk på navn, tittel, emoji"
          onChange={this.onChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

const AddEmployeeButton = ({ creatingEmployee, setNew }) => {
  return (
    <div className="add-employee-button">
      <button
        onClick={() => {
          setNew(!creatingEmployee);
        }}
        className="add-employee-button__button mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"
      >
        <i className="material-icons dark-gray">{creatingEmployee ? "clear" : "add"}</i>
      </button>
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
      <div>
        <div className="floq-list">
          <div className="floq-list-header">
            <SearchField />
            <FormControlLabel
              control={<Switch onChange={this.props.toggleShowTerminated} />}
              label="Vis x-blankere"
            />
          </div>
          <div className="floq-cards">
            {this.props.creatingEmployee ? <EmployeeCard employee={null} /> : null}
            <RoleColumn data={this.props.employees.data.designers} roleTitle={"Designere"} />
            <RoleColumn data={this.props.employees.data.technologists} roleTitle={"Teknologer"} />
            <RoleColumn data={this.props.employees.data.other} roleTitle={"Administrasjon ++"} />
          </div>
        </div>
        <AddEmployeeButton creatingEmployee={this.props.creatingEmployee} setNew={this.setNew} />
      </div>
    );
  }
}

EmployeeList.propTypes = {
  employees: PropTypes.object.isRequired,
  newEmployee: PropTypes.func,
  creatingEmployee: PropTypes.bool
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
