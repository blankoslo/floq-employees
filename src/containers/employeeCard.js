import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import format from 'date-fns/format';
import Spinner from '../components/spinner';
import { setEmployeeEditorInitialValues, toggleEmployeeEditor } from '../actions/index';
import ImageWithOverlay from './ImageWithOverlay';
import ContactInformation from './ContactInformation';

const EmergancyContact = ({ name, relation, phone }) => {
  if (!name || !phone) return null;
  return (
    <div>
      <h5>Kontaktperson</h5>
      <span>{`${name || ''} (${relation || ''})`}</span>
      <a href={`tel:${phone || ''}`}>{phone || ''}</a>
    </div>
  );
};

EmergancyContact.propTypes = {
  name: PropTypes.string.isRequired,
  relation: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

const Address = ({ streetAddress, postalCode, city }) => {
  if (!streetAddress && !postalCode && !city) return null;
  return (
    <div className="expanded-info__address">
      <h5>Adresse</h5>
      <address>
        {streetAddress || ''}
        <br />
        {`${postalCode || ''} ${city || ''}`}
      </address>
    </div>
  );
};

Address.propTypes = {
  streetAddress: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
};

const Birthday = ({ birthDate }) => {
  if (!birthDate) return null;
  return (
    <div>
      <h5>Bursdag</h5>
      <span>{format(new Date(birthDate), 'DD/MM/YYYY')}</span>
    </div>
  );
};

Birthday.propTypes = {
  birthDate: PropTypes.string.isRequired
};

const WorkplaceWithCardExpandButton = ({ workplace, expanded, toggleExpanded }) => {
  const customerText =
    workplace !== 'Blank' ? `På oppdrag hos ${workplace}` : 'Jobber nå internt hos Blank';
  return (
    <div className="customer-info-and-expand">
      <span className="customer-info-and-expand__customer-text">{customerText}</span>
      <div className="customer-info-and-expand__expand-button" onClick={toggleExpanded}>
        <span>{expanded ? 'Lukk' : 'Mer info'}</span>
        <i className="material-icons">{expanded ? 'expand_less' : 'expand_more'}</i>
      </div>
    </div>
  );
};

WorkplaceWithCardExpandButton.propTypes = {
  workplace: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired
};

const AskMeAbout = ({ text }) => {
  if (!text) return null;
  return (
    <div>
      <h5>Spør meg om</h5>
      <span>{text}</span>
    </div>
  );
};

AskMeAbout.propTypes = {
  text: PropTypes.string.isRequired
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

ExpandedInformation.propTypes = {
  employee: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired
};

const formatPhoneNumber = phoneNumber =>
  phoneNumber.replace(/\s+/g, '').replace(/(\d{2})(?=\d)/g, '$1 ');

class EmployeeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggleExpanded = e => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
    e.stopPropagation();
  };

  editEmployee = () => {
    this.props.editEmployee(this.props.employee);
  };

  render() {
    if (this.props.employee.loading) {
      return <Spinner />;
    }
    if (this.props.employee.data === null) {
      return <div>Not found...</div>;
    }
    const phone = formatPhoneNumber(this.props.employee.phone);

    return (
      <div className="employee-card" onClick={this.editEmployee}>
        <ImageWithOverlay
          firstName={this.props.employee.first_name}
          lastName={this.props.employee.last_name}
          imageUrl={this.props.employee.image_url}
          dateOfEmployment={this.props.employee.date_of_employment}
          title={this.props.employee.title}
          emoji={this.props.employee.emoji}
          cardColor={this.props.employee.cardColor}
        />
        <ContactInformation
          email={this.props.employee.email}
          phone={phone}
          cardColor={this.props.employee.cardColor}
        />
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

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
  editEmployee: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  editEmployee: employeeData => {
    dispatch(setEmployeeEditorInitialValues(employeeData));
    dispatch(toggleEmployeeEditor());
  }
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(EmployeeCard);
