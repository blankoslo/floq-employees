import PropTypes from 'prop-types';
import React, { Component } from "react";
import sha1 from "sha1";
import superagent from "superagent";

import { connect } from "react-redux";

import { updateEmployee } from "../actions/index";
import ImageDrop from "../components/imageDrop";
import Spinner from "../components/spinner";

class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: true,
      uploading: false
    };
  }

  uploadFile = files => {
    this.setState({ uploading: true });

    const image = files[0];
    const cloudName = "blank";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const timestamp = Date.now() / 1000;
    const uploadPreset = "ansattliste";

    const publicId = this.props.employee.id;

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
    uploadRequest.attach("file", image);

    Object.keys(params).forEach(key => {
      uploadRequest.field(key, params[key]);
    });

    uploadRequest.end((err, resp) => {
      if (err === true) {
        return;
      }

      const updatedEmployee = Object.assign({}, this.props.employee);
      updatedEmployee.image_url = resp.body.secure_url;

      this.props.updateEmployee(parseInt(publicId), updatedEmployee);
      this.setState({ uploading: false, hover: false });
    });
  };

  toggleHover = () => {
    this.setState({
      hover: !this.state.hover
    });
  };

  render() {
    if (this.props.employee.id == null) {
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
        imgSrc={this.props.employee.image_url}
        hover={this.state.hover}
        onDrop={this.uploadFile}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      />
    );
  }
}

Images.propTypes = {
  employee: PropTypes.object,
  updateEmployee: PropTypes.func,
  onSubmit: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Images);
