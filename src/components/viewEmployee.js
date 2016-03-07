import React, { Component } from 'react';
import { connect } from 'react-redux';

class ViewEmployee extends Component {
    render() {
      const activeId = parseInt(this.props.params.id);
      const activeEmployee = this.props.employees.find(e => e.id === activeId);
      const gridClasses="mdl-cell mdl-cell--6-col mdl-cell--3-offset-desktop mdl-cell--12-col-phone";

        return (
          <div className="mdl-grid">
            <div className={gridClasses} style={{textAlign: 'center'}}>
              {activeEmployee.first_name} {activeEmployee.last_name}
            </div>
            <div className={gridClasses} style={{textAlign: 'center'}}>
              {activeEmployee.title}
            </div>
            <div className={gridClasses}>
              <i className='material-icons'>phone</i>
              {activeEmployee.phone}
            </div>
            <div className={gridClasses}>
                      <i className='material-icons'>email</i>
                      {activeEmployee.email}
            </div>
            <div className={gridClasses}>
              <i className='material-icons'>location_on</i>
              {activeEmployee.address}
              <br />
              {activeEmployee.postal_code} {activeEmployee.city}
            </div>
            <div className={gridClasses}>
              <hr />
            </div>
            <div className={gridClasses}>
              <h4>Kontaktperson</h4>
            </div>
            <div className={gridClasses}>
              {activeEmployee.emergency_contact_name}
            </div>
            <div className={gridClasses}>
              {activeEmployee.emergency_contact_relation}
            </div>
            <div className={gridClasses}>
              {activeEmployee.emergency_contact_phone}
            </div>
          </div>
        );
    }
};

/*
            <div>
                mdl-cell--N-offset-desktop
                {activeEmployee.first_name}
            </div>
*/

const mapStateToProps = ({ employees }) => ({
  employees: employees
});

export default connect(mapStateToProps)(ViewEmployee);
