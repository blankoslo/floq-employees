import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import EmployeeImage from './employeeImage';

const HOVER_LABEL_TEXT = 'Klikk eller slepp bildefil';
const MATERIAL_CLOUD_ICON = 'cloud_upload';

const HoverLabel = () => (
  <div className='image-hover-label'>
    <i className='image-hover-label__icon material-icons'>{MATERIAL_CLOUD_ICON}</i>
    <a className='image-hover-label__text'>{HOVER_LABEL_TEXT}</a>
  </div>
);

const MobileUploadButton = () => (
  <div className='mobile-upload-button'>
    <i className='material-icons'>{MATERIAL_CLOUD_ICON}</i>
  </div>
);

const ImageDrop = ({ onDrop, onMouseEnter, imgSrc }) => (
  <Dropzone
    className='image-drop__dropzone'
    onDrop={onDrop}
    onMouseEnter={onMouseEnter}
  >
    <div className='image-drop__image-container'>
      <EmployeeImage
        className='edit-pic'
        src={imgSrc}
        width='341'
        height='267'
      />
      <MobileUploadButton /> {/* Only on viewport < 500px */}
      <HoverLabel />
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
