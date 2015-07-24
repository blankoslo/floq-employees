var React = require('react');

var FormField = require('./formField.jsx');

var selectField = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        error: React.PropTypes.bool,
        value: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        disabled: React.PropTypes.bool
    },

    render: function () {
        var id = this.props.id;
        var label = this.props.label;
        var error = this.props.error;
        var value = this.props.value;
        var options = this.props.options;
        var handleChange = this.props.handleChange;
        var disabled = this.props.disabled;

        if (this.props.value === "Velg") {
            var defaultValue = (
                <option hidden value="Velg">
                    "Velg"
                </option>
            );
        }
        return (
            <FormField error={error} id={id} label={label}>
                <select className="form-control" id={id} name={id} onChange={handleChange} value={value} disabled={disabled}>
                    {defaultValue}
                    {options.map(this.option)}
                </select>
            </FormField>
        );
    },
    option: function (optionData) {
        return (
            <option key={optionData.name} value={optionData.value}>
                {optionData.name}
            </option>
        );
    }
});

module.exports = selectField;