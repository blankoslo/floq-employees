import PropTypes from 'prop-types';
import React, { Component } from 'react';
import sha1 from 'sha1';
import superagent from 'superagent';

import { connect } from 'react-redux';
import ImageDrop from './imageDrop';
import Spinner from './spinner';

class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false
    };
  }

  uploadFile = files => {
    this.setState({ uploading: true });

    const {
      employeeData,
      input: { onChange }
    } = this.props;

    const image = files[0];
    const cloudName = 'blank';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const timestamp = Date.now() / 1000;
    const uploadPreset = 'ansattliste';

    const publicId = employeeData.id;

    const paramStr = `public_id=${publicId}\
&timestamp=${timestamp}\
&upload_preset=${uploadPreset}\
MxK1OBDt-H488-5dUMB64sJb8NY`;

    const signature = sha1(paramStr);

    const params = {
      api_key: window.config.cloudinaryApiKey,
      public_id: publicId,
      timestamp,
      upload_preset: uploadPreset,
      signature
    };

    const uploadRequest = superagent.post(url);
    uploadRequest.attach('file', image);

    Object.keys(params).forEach(key => {
      uploadRequest.field(key, params[key]);
    });

    uploadRequest.end((err, resp) => {
      if (err === true) {
        return;
      }

      this.setState({ uploading: false });
      onChange(resp.body.secure_url);
    });
  };
  render() {
    if (this.props.employeeData.id === undefined) {
      return <div />;
    }

    if (this.state.uploading === true) {
      return (
        <div className="edit-pic">
          <Spinner />
        </div>
      );
    }

    return (
      <ImageDrop
        imgSrc={this.props.input.value}
        onDrop={this.uploadFile}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      />
    );
  }
}

const mapStateToProps = state => ({
  employeeData: state.edit.initialValues
});

Images.propTypes = {
  employeeData: PropTypes.object,
  input: PropTypes.object
};

export default connect(mapStateToProps)(Images);
