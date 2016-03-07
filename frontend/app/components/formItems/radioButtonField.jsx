var React = require('react');

var FormField = require('./formField.jsx');

var rbField = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        error: React.PropTypes.bool,
        value: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        disabled: React.PropTypes.bool
    },

    render() {
        var id = this.props.id;
        var label = this.props.label;
        var error = this.props.error;
        var options = this.props.options;

        return (
            <FormField error={error} id={id} label={label}>
                {options.map(this.option)}
            </FormField>
        );
    },

    option(optionData) {
        var selected = "";
        if(this.props.value === optionData.value) selected = "true";

        return (
        <div><label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={optionData.value}>
            <input onChange={this.props.handleChange} className="mdl-radio__button" id={optionData.value} name={this.props.id} type="radio" value={optionData.value} checked={selected} />
            <span className="mdl-radio__label">{optionData.name}</span>
        </label></div>
        );
    }
});

module.exports = rbField;
