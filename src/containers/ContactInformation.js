import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const ContactInformation = ({ email, phone, cardColor }) => {
  if (!phone && !email) return null;
  const className = classNames(
    'contact-info',
    { 'contact-info--blank-purple': cardColor === 0 },
    { 'contact-info--blank-pink': cardColor === 1 }
  );
  return (
    <div className={className}>
      <div>
        <a className="contact-info__medium" href={`tel:${phone}`}>
          {phone || ''}
        </a>
        <a className="contact-info__medium" href={`mailto:${email}`}>
          {email || ''}
        </a>
      </div>
    </div>
  );
};

ContactInformation.propTypes = {
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cardColor: PropTypes.number.isRequired
};

export default ContactInformation;
