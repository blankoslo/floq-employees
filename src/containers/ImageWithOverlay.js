import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import nbLocale from 'date-fns/locale/nb';
import distanceInWords from 'date-fns/distance_in_words';
import format from 'date-fns/format';
import EmployeeImage from '../components/employeeImage';

// const durationText = (strings, isTerminated);

const ImageWithOverlay = props => {
  const {
    onClick,
    firstName,
    lastName,
    dateOfEmployment,
    terminatedEmployee,
    futureEmployee,
    terminationDate,
    imageUrl,
    title,
    emoji,
    cardColor
  } = props;

  const className = classNames(
    'image-with-overlay__overlay-text-and-emoji',
    { 'image-with-overlay__overlay-text-and-emoji--blank-purple': cardColor === 0 },
    { 'image-with-overlay__overlay-text-and-emoji--blank-pink': cardColor === 1 }
  );
  const toDate = terminatedEmployee ? new Date(terminationDate) : new Date();

  const employeementDistanceInWords = distanceInWords(new Date(dateOfEmployment), toDate, {
    locale: nbLocale
  });

  const durationText = terminatedEmployee
    ? `Tidligere ${title} i ${employeementDistanceInWords}`
    : futureEmployee
    ? `Fremtidig ${title} med oppstart ${format(new Date(dateOfEmployment), 'D. MMMM YYYY')}`
    : `${title} i ${employeementDistanceInWords}`;

  return (
    <div className="image-with-overlay" onClick={onClick}>
      <EmployeeImage className="card-pic" src={imageUrl} width="800" height="400" />
      <div className={className}>
        <div>
          <h1>{`${firstName} ${lastName}`}</h1>
          <span>{durationText}</span>
        </div>
        <span>{emoji}</span>
      </div>
    </div>
  );
};

ImageWithOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  dateOfEmployment: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  cardColor: PropTypes.number.isRequired,
  terminationDate: PropTypes.string,
  terminatedEmployee: PropTypes.bool.isRequired,
  futureEmployee: PropTypes.bool.isRequired
};

ImageWithOverlay.defaultProps = {
  imageUrl: '',
  emoji: '',
  terminationDate: ''
};

export default ImageWithOverlay;
