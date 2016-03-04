var React = require('react');

var FormField = require('./formField.jsx');

var textField = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        error: React.PropTypes.bool,
        value: React.PropTypes.string.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        handleBlur: React.PropTypes.func
    },

    render() {
        var id = this.props.id;
        var label = this.props.label;
        var error = this.props.error;
        var value = this.props.value;
        var handleChange = this.props.handleChange;
        var handleBlur = this.props.handleBlur;
        var required = this.props.required;

        return (
            <FormField id={id}
                       label={label}
                       error={error}
                       className='mdl-textfield mdl-js-textfield form-element'
                       labelClassName='mdl-textfield__label'>
                <input
                    type="text"
                    className="mdl-textfield__input"
                    id={id}
                    onChange={handleChange}
                    value={value}
                    name={id}
                    onBlur={handleBlur}
                    required={required}/>
            </FormField>
        );
    }
});

module.exports = textField;
