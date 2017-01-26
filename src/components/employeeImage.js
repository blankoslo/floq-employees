import React from 'react';

const EmployeeImage = (props) => {
  // Cloudinary image resize
  let src = props.src;
  if (src !== null) {
    src = src.replace('/upload/', `/upload/w_${props.width},h_${props.height},c_fill/`);
  } else {
    src = `https://res.cloudinary.com/blank/image/upload/w_${props.width},h_${props.height},c_fill/v1485263369/person-placeholder_jld9eh.jpg`;
  }

  return (
    <img
      className={props.className}
      src={src}
      alt='Empty'
    />
  );
};

EmployeeImage.propTypes = {
  className: React.PropTypes.string,
  src: React.PropTypes.string,
  width: React.PropTypes.string,
  height: React.PropTypes.string
};

export default EmployeeImage;
