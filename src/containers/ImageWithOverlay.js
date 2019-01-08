import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import nbLocale from 'date-fns/locale/nb';
import distanceInWords from 'date-fns/distance_in_words';
import EmployeeImage from '../components/employeeImage';

const ImageWithOverlay = props => {
  const { firstName, lastName, dateOfEmployment, imageUrl, title, emoji, cardColor } = props;
  const className = classNames(
    'image-with-overlay__overlay-text-and-emoji',
    { 'image-with-overlay__overlay-text-and-emoji--blank-purple': cardColor === 0 },
    { 'image-with-overlay__overlay-text-and-emoji--blank-pink': cardColor === 1 }
  );
  return (
    <div className="image-with-overlay">
      <EmployeeImage className="card-pic" src={imageUrl} width="800" height="400" />
      <div className={className}>
        <div>
          <h1>{`${firstName} ${lastName}`}</h1>
          <span>
            {`${title} at blank i ${distanceInWords(new Date(dateOfEmployment), new Date(), {
              locale: nbLocale
            })}`}
          </span>
        </div>
        <span>{emoji}</span>
      </div>
    </div>
  );
};

ImageWithOverlay.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  dateOfEmployment: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  cardColor: PropTypes.number.isRequired
};

ImageWithOverlay.defaultProps = {
  imageUrl: '',
  emoji: ''
};

export default ImageWithOverlay;
