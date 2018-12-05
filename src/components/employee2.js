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

const EmergancyContact = ({ name, relation, phone }) => {
  if (!name || !phone) return null;
  return (
    <div>
      <h5>Kontaktperson</h5>
      <a>{`${name || ""} (${relation || ""})`}</a>
      <a href={`tel:${phone || ""}`} />
    </div>
  );
};

const ContactInformation = ({ email, phone }) => {
  if (!phone && !email) return null;
  return (
    <div className="contact-info">
      <a href={`tel:${phone}`}>{phone || ""}</a>
      <a href={`mailto:${email}`}>{email || ""}</a>
    </div>
  );
};

const Address = ({ streetAddress, postalCode, city }) => {
  if (!streetAddress && !postalCode && !city) return null;
  return (
    <div className="expanded-info__address">
      <h5>Adresse</h5>
      <address>
        {streetAddress || ""}
        <br />
        {`${postalCode || ""} ${city || ""}`}
      </address>
    </div>
  );
};

const Birthday = ({ birthDate }) => {
  if (!birthDate) return null;
  return (
    <div>
      <h5>Bursdag</h5>
      <a>{format(new Date(birthDate), "DD/MM/YYYY")}</a>
    </div>
  );
};

const DebitAccountNumber = ({ accountNumber }) => {
  if (!accountNumber) return null;
  return (
    <div>
      <h5>Kontonummer</h5>
      <a>{accountNumber}</a>
    </div>
  );
};

const WorkplaceWithCardExpandButton = ({ workplace, expanded, toggleExpanded }) => (
  <div className="customer-info-and-expand">
    <a className="customer-info-and-expand__customer-text">{`Jobber nå hos ${
      workplace ? workplace : "morra di"
    }`}</a>
    <div className="customer-info-and-expand__expand-button" onClick={toggleExpanded}>
      <a>{expanded ? "Lukk" : "Mer info"}</a>
      <i className="material-icons">{expanded ? "expand_less" : "expand_more"}</i>
    </div>
  </div>
);

const AskMeAbout = ({ text }) => {
  if (!text) return null;
  return (
    <div>
      <h5>Spør meg om</h5>
      <a>{text}</a>
    </div>
  );
};

const ExpandedInformation = ({ employee, expanded }) => {
  if (!expanded) return null;
  return (
    <div className="expanded-info">
      <Birthday birthDate={employee.birth_date} />
      <Address streetAddress={employee.address} postalCode={employee.postal} city={employee.city} />
      <EmergancyContact
        name={employee.emergency_contact_name}
        phone={employee.emergency_contact_phone}
        relation={employee.emergency_contact_relation}
      />
      <AskMeAbout text={undefined} />
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
    const firstNames = this.props.employee.first_name.split(" ");

    return (
      <div className="employee-card">
        <ImageWithOverlay
          firstNames={firstNames}
          lastName={this.props.employee.last_name}
          imageUrl={this.props.employee.image_url}
          dateOfEmployment={this.props.employee.date_of_employment}
          title={this.props.employee.title}
          emoji={this.props.employee.emoji}
        />
        <ContactInformation email={this.props.employee.email} phone={this.props.employee.phone} />
        <WorkplaceWithCardExpandButton
          workplace={this.props.employee.customer_name}
          expanded={this.state.expanded}
          toggleExpanded={this.toggleExpanded}
        />
        <ExpandedInformation employee={this.props.employee} expanded={this.state.expanded} />
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
