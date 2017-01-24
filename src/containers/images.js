import React, { Component } from 'react';
import sha1 from 'sha1';
import superagent from 'superagent';

import { connect } from 'react-redux';

import { updateEmployee } from '../actions/index';
import ImageDrop from '../components/imageDrop';


class Images extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  uploadFile = (files) => {
    const image = files[0];
    const cloudName = 'blank';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const timestamp = Date.now() / 1000;
    const uploadPreset = 'ansattliste';

    const publicId = this.props.employee.data.id;

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
      signature,
    };

    const uploadRequest = superagent.post(url);
    uploadRequest.attach('file', image);

    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key]);
    });

    uploadRequest.end((err, resp) => {
      if (err === true) {
        return;
      }
      const updatedEmployee = Object.assign({}, this.props.employee.data);
      updatedEmployee.image_url = resp.body.secure_url;

      this.props.updateEmployee(parseInt(publicId), updatedEmployee);
    });
  }

  toggleHover = () => {
    this.setState({
      hover: !this.state.hover
    });
  }

  render() {
    return (
      <ImageDrop
        imgSrc={this.props.employee.data.image_url}
        hover={this.state.hover}
        onDrop={this.uploadFile}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      />);
  }
}

Images.propTypes = {
  employee: React.PropTypes.object,
  updateEmployee: React.PropTypes.func
};

const mapStateToProps = (state) => ({
  imgSrc: state.images
});

const mapDispatchToProps = {
  updateEmployee
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);
