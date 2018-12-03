import React from "react";
import EmployeeImage from "./employeeImage";
import Spinner from "./spinner";

import nbLocale from "date-fns/locale/nb";
import distanceInWords from "date-fns/distance_in_words";
import format from "date-fns/format";

const ImageWithOverlay = props => {
  const { firstNames, lastName, dateOfEmployment, imageUrl, title, emoji } = props;
  return (
    <div className="image-with-overlay">
      <EmployeeImage className="card-pic" src={imageUrl} width="400" height="200" />
      <div className="image-with-overlay__overlay-text-and-emoji">
        <div>
          <h1>
            {firstNames[0]} {firstNames[1]} {lastName}
          </h1>
          <a>{`${title} at blank i ${distanceInWords(new Date(dateOfEmployment), new Date(), {
            locale: nbLocale
          })}`}</a>
        </div>
        <a>{emoji}</a>
      </div>
    </div>
  );
};

const ContactInformation = ({ email, phone }) => {
  return (
    <div className="contact-info">
      <a href={`tel:${phone}`}>{phone}</a>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  );
};

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    if (this.props.employee.loading) {
      return <Spinner />;
    } else if (this.props.employee.data === null) {
      return <div>Not found...</div>;
    }

    const employee = this.props.employee;
    const firstNames = employee.first_name.split(" ");
    const birthDate = employee.birth_date
      .split("-")
      .reverse()
      .join("-");

    return (
      <div className="employee-card">
        <ImageWithOverlay
          firstNames={firstNames}
          lastName={employee.last_name}
          imageUrl={employee.image_url}
          dateOfEmployment={employee.date_of_employment}
          title={employee.title}
          emoji={employee.emoji}
        />
        <ContactInformation email={employee.email} phone={employee.phone} />
        <div className="customer-info-and-expand">
          <a className="customer-info-and-expand__customer-text">{`Jobber nå hos ${
            employee.customer_name ? employee.customer_name : "morra di"
          }`}</a>
          <div className="customer-info-and-expand__expand-button" onClick={this.toggleExpanded}>
            <a>{this.state.expanded ? "Lukk" : "Mer info"}</a>
            <i className="material-icons">{this.state.expanded ? "expand_less" : "expand_more"}</i>
          </div>
        </div>
        <div className="expanded-info">
          <div>
            <h5>Bursdag</h5>
            <a>{format(new Date(employee.birth_date), "DD/MM/YYYY")}</a>
          </div>
          <div>
            <h5>Adresse</h5>
            <address>
              {employee.address}
              <br />
              {`${employee.postal} ${employee.city}`}
            </address>
          </div>
          <div>
            <h5>Kontonummer</h5>
            <a>{"xxx.xx.xxxxx"}</a>
          </div>
          <div>
            <h5>Kontaktperson</h5>
            <a>{`${employee.emergency_contact_name} (${employee.emergency_contact_relation})`}</a>
            <a href={`tel:${employee.emergency_contact_phone}`} />
          </div>
          <div>
            <h5>Spør meg om</h5>
            <a>Indonesisk mat og obskure programmeringsspråk.</a>
          </div>
        </div>
      </div>
    );
  }
}

Employee.propTypes = {
  employee: React.PropTypes.object,
  onEdit: React.PropTypes.func,
  onExpand: React.PropTypes.func
};

export default Employee;
