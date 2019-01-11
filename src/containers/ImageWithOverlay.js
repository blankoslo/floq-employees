import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import nbLocale from 'date-fns/locale/nb';
import distanceInWords from 'date-fns/distance_in_words';
import EmployeeImage from '../components/employeeImage';

// const durationText = (strings, isTerminated);

const ImageWithOverlay = props => {
  const {
    onClick,
    firstName,
    lastName,
    dateOfEmployment,
    isterminatedEmployee,
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
  const toDate = isterminatedEmployee ? new Date(terminationDate) : new Date();

  return (
    <div className="image-with-overlay" onClick={onClick}>
      <EmployeeImage className="card-pic" src={imageUrl} width="800" height="400" />
      <div className={className}>
        <div>
          <h1>{`${firstName} ${lastName}`}</h1>
          <span>
            {`${isterminatedEmployee ? 'Tidligere ' : ''}${title} i ${distanceInWords(
              new Date(dateOfEmployment),
              toDate,
              {
                locale: nbLocale
              }
            )}`}
          </span>
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
  isterminatedEmployee: PropTypes.bool.isRequired
};

ImageWithOverlay.defaultProps = {
  terminationDate: ''
};

ImageWithOverlay.defaultProps = {
  imageUrl: '',
  emoji: ''
};

export default ImageWithOverlay;
