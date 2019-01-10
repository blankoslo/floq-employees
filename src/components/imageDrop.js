import PropTypes from 'prop-types';
import React, { Component } from 'react';
import sha1 from 'sha1';
import superagent from 'superagent';
import Dropzone from 'react-dropzone';

import { connect } from 'react-redux';
import EmployeeImage from './employeeImage';
import Spinner from './spinner';

const HOVER_LABEL_TEXT = 'Klikk eller slepp bildefil';
const MATERIAL_CLOUD_ICON = 'cloud_upload';

const HoverLabel = () => (
  <div className="image-hover-label">
    <i className="image-hover-label__icon material-icons">{MATERIAL_CLOUD_ICON}</i>
    <span className="image-hover-label__text">{HOVER_LABEL_TEXT}</span>
  </div>
);

const MobileUploadButton = () => (
  <div className="mobile-upload-button">
    <i className="material-icons">{MATERIAL_CLOUD_ICON}</i>
  </div>
);

class ImageDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false
    };
  }

  initRequestFields = employeeId => {
    const fields = {
      public_id: employeeId,
      timestamp: Date.now() / 1000,
      upload_preset: 'ansattliste'
    };
    const signature = sha1(`${new URLSearchParams(fields).toString()}MxK1OBDt-H488-5dUMB64sJb8NY`);
    return { ...fields, signature, api_key: window.config.cloudinaryApiKey };
  };

  initRequestObject = (url, fields, imageFile) => {
    const uploadRequest = superagent.post(url);
    uploadRequest.attach('file', imageFile);

    Object.keys(fields).forEach(key => {
      uploadRequest.field(key, fields[key]);
    });

    return uploadRequest;
  };

  handleFileUpload = files => {
    this.setState({ uploading: true });

    const {
      employeeData,
      input: { onChange }
    } = this.props;

    const url = `https://api.cloudinary.com/v1_1/blank/image/upload`;
    const fields = this.initRequestFields(employeeData.id);
    const uploadRequest = this.initRequestObject(url, fields, files[0]);

    uploadRequest.end((err, resp) => {
      if (err === true) {
        return;
      }
      this.setState({ uploading: false });
      onChange(resp.body.secure_url);
    });
  };

  render() {
    const { employeeData } = this.props;
    if (!employeeData.id) return null;
    return (
      <Dropzone className="image-drop__dropzone" onDrop={this.handleFileUpload}>
        <div className="image-drop__image-container">
          <EmployeeImage
            className="edit-pic"
            src={this.props.input.value}
            width="341"
            height="267"
          />
          {this.state.uploading && (
            <div className="image-drop-spinner-container">
              <Spinner />
            </div>
          )}
          <MobileUploadButton />
          {/* Only on viewport < 500px */}
          <HoverLabel />
        </div>
      </Dropzone>
    );
  }
}

const mapStateToProps = state => ({
  employeeData: state.edit.initialValues
});

ImageDrop.propTypes = {
  employeeData: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ImageDrop);
