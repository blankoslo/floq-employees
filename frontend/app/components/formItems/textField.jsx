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

        return (
            <FormField id={id} label={label} error={error}>
                <input
                    type="text"
                    className="form-control"
                    id={id}
                    onChange={handleChange}
                    value={value}
                    name={id}
                    onBlur={handleBlur} />
            </FormField>
        );
    }
});

module.exports = textField;
