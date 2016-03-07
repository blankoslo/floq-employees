var React = require('react');

var TextField = require('./textField.jsx');

var dateField = React.createClass({
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
            <TextField id={id} label={label} value={value} handleChange={handleChange} error={error} required={required} />
        );
    }
});

module.exports = dateField;
