import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import EmployeeImage from './employeeImage';

const ImageDrop = ({ onDrop, onMouseEnter, imgSrc }) => (
  <Dropzone
    className='image-drop__dropzone'
    onDrop={onDrop}
    onMouseEnter={onMouseEnter}
  >
    <div className='image-drop__image-container'>
      <EmployeeImage className='edit-pic' src={imgSrc} width='341' height='267' />
      <div className='mobile-upload-button'>
        <i className='material-icons'>cloud_upload</i>
      </div>
      <div className='edit-hover'>
        <i className='edit-hover__icon material-icons'>cloud_upload</i>
        <a className='edit-hover__description'>Klikk eller slepp bildefil</a>
      </div>
    </div>
  </Dropzone>
);

ImageDrop.propTypes = {
  imgSrc: PropTypes.string,
  hover: PropTypes.bool,
  onDrop: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default ImageDrop;
