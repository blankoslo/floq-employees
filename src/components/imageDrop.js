import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import EmployeeImage from './employeeImage';

const ImageDrop = ({ onDrop, onMouseEnter, imgSrc }) => (
  <div>
    <Dropzone onDrop={onDrop} onMouseEnter={onMouseEnter} className='image-drop__dropzone'>
      <div>
        <EmployeeImage className='edit-pic' src={imgSrc} width='341' height='267' />
        <div className='edit-hover'>
          <i className='edit-hover__icon material-icons'>cloud_upload</i>
          <a className='edit-hover__description'>Klikk eller slepp bildefil</a>
        </div>
      </div>
    </Dropzone>
  </div>
);

ImageDrop.propTypes = {
  imgSrc: PropTypes.string,
  hover: PropTypes.bool,
  onDrop: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default ImageDrop;
