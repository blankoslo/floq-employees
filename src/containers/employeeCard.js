import PropTypes from 'prop-types';
import React from 'react';
import EmployeeImage from '../components/employeeImage';
import Spinner from '../components/spinner';
import EditEmployeeButton from '../components/EditEmployeeButton';

import nbLocale from 'date-fns/locale/nb';
import distanceInWords from 'date-fns/distance_in_words';
import format from 'date-fns/format';

const ImageWithOverlay = props => {
  const { firstNames, lastName, dateOfEmployment, imageUrl, title, emoji } = props;
  return (
    <div className='image-with-overlay'>
      <EmployeeImage className='card-pic' src={imageUrl} width='800' height='400' />
      <div className='image-with-overlay__overlay-text-and-emoji'>
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

ImageWithOverlay.propTypes = {
  firstNames: PropTypes.array,
  lastName: PropTypes.string,
  dateOfEmployment: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  emoji: PropTypes.string
};

const EmergancyContact = ({ name, relation, phone }) => {
  if (!name || !phone) return null;
  return (
    <div>
      <h5>Kontaktperson</h5>
      <a>{`${name || ''} (${relation || ''})`}</a>
      <a href={`tel:${phone || ''}`} />
    </div>
  );
};

EmergancyContact.propTypes = {
  name: PropTypes.string,
  relation: PropTypes.string,
  phone: PropTypes.string
};

const ContactInformation = ({ email, phone }) => {
  if (!phone && !email) return null;
  return (
    <div className='contact-info'>
      <a href={`tel:${phone}`}>{phone || ''}</a>
      <a href={`mailto:${email}`}>{email || ''}</a>
    </div>
  );
};

ContactInformation.propTypes = {
  phone: PropTypes.string,
  email: PropTypes.string
};

const Address = ({ streetAddress, postalCode, city }) => {
  if (!streetAddress && !postalCode && !city) return null;
  return (
    <div className='expanded-info__address'>
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
  streetAddress: PropTypes.string,
  postalCode: PropTypes.string,
  city: PropTypes.city
};

const Birthday = ({ birthDate }) => {
  if (!birthDate) return null;
  return (
    <div>
      <h5>Bursdag</h5>
      <a>{format(new Date(birthDate), 'DD/MM/YYYY')}</a>
    </div>
  );
};

Birthday.propTypes = {
  birthDate: PropTypes.string
};

const WorkplaceWithCardExpandButton = ({ workplace, expanded, toggleExpanded }) => {
  const customerText = workplace ? `På oppdrag hos ${workplace}` : `Jobber nå internt hos Blank`;
  return (
    <div className='customer-info-and-expand'>
      <a className='customer-info-and-expand__customer-text'> {customerText}</a>
      <div className='customer-info-and-expand__expand-button' onClick={toggleExpanded}>
        <a>{expanded ? 'Lukk' : 'Mer info'}</a>
        <i className='material-icons'>{expanded ? 'expand_less' : 'expand_more'}</i>
      </div>
    </div>
  );
};

WorkplaceWithCardExpandButton.propTypes = {
  workplace: PropTypes.string,
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func
};

const AskMeAbout = ({ text }) => {
  if (!text) return null;
  return (
    <div>
      <h5>Spør meg om</h5>
      <a>{text}</a>
    </div>
  );
};

AskMeAbout.propTypes = {
  text: PropTypes.string
};

const ExpandedInformation = ({ employee, expanded }) => {
  if (!expanded) return null;
  return (
    <div className='expanded-info'>
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
  employee: PropTypes.object,
  expanded: PropTypes.bool
};

export default class EmployeeCard extends React.Component {
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
    const firstNames = this.props.employee.first_name.split(' ');

    return (
      <div className='employee-card'>
        <EditEmployeeButton id={this.props.employee.id} />
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

EmployeeCard.propTypes = {
  employee: PropTypes.object
};
