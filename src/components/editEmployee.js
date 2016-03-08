import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createEmployee } from '../actions/index';

const FormTextField = props => {
  return (
      <div className="mdl-grid">
        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
          <input className='mdl-textfield__input' type='text' id={props.id} pattern={props.pattern} {...props.field} />
          <label className='mdl-textfield__label' htmlFor={props.id}>{props.label}</label>
          <span className='mdl-textfield__error'>{props.field.error}</span>
        </div>
      </div>
    );
}

class EditEmployee extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  onSubmit(props) {
    this.props.createEmployee(props)
        .then(res => {
          console.log('res', res);
          // Employee was created, navigate to the index
          //this.context.router.push('/');
        });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
        <FormTextField
            label='Fornavn'
            field={this.props.fields.first_name}
            id='first_name'
            pattern='.+'
        />
        <FormTextField
            label='Etternavn'
            field={this.props.fields.last_name}
            id='last_name'
            pattern='.+'
        />
        <FormTextField
            label='Adresse'
            field={this.props.fields.address}
            id='address'
            pattern='.+'
        />
        <FormTextField
            label='Postnummer'
            field={this.props.fields.postal_code}
            id='postal_code'
            pattern='^\d+$'
        />
        <FormTextField
            label='Poststed'
            field={this.props.fields.city}
            id='city'
            pattern='.+'
        />
      <div className="mdl-grid">
        <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'type='submit'>Lagre</button>
      </div>
      </form>
    );
  }
};

const validate = values => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = 'Oppgi fornavn';
  }

  if (!values.last_name) {
    errors.last_name = 'Oppgi etternavn';
  }

  if (!values.address) {
    errors.address = 'Oppgi adresse';
  }

  if (!values.postal_code) {
    errors.postal_code = 'Oppgi postnummer';
  } else if (!/^\d+$/.test(values.postal_code)) {
    errors.postal_code = 'Ugyldig postnummer';
  }

  if (!values.city) {
    errors.city = 'Oppgi poststed';
  }

  return errors;
};

export default reduxForm({
  form: 'EditEmployeeForm',
  fields: ['first_name', 'last_name', 'phone', 'email', 'address',
           'postal_code', 'city'],
  validate
}, null, { createEmployee })(EditEmployee);
