import PropTypes from 'prop-types';
import React from 'react';

const EmployeeImage = ({ src, width, height, className }) => {
  // Cloudinary image resize
  let augSrc;
  if (src != null && src !== '') {
    augSrc = src.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`);
  } else {
    augSrc = `https://res.cloudinary.com/blank/image/upload/w_${width},h_${height},c_fill/v1485263369/person-placeholder_jld9eh.jpg`;
  }

  return (
    <div>
      <img className={className} src={augSrc} role="presentation" />
    </div>
  );
};

EmployeeImage.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
};

EmployeeImage.defaultProps = {
  src: ''
};

export default EmployeeImage;
