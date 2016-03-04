var React = require('react');
var DatePicker = require('react-datepicker');

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

    handleChangedDate: function(date) {
        this.props.handleChange(date, this.props.id);
    },

    render() {
        var id = this.props.id;
        var label = this.props.label;
        var error = this.props.error;
        var value = this.props.value;
        var handleBlur = this.props.handleBlur;

        return (
            <FormField id={id} label={label} error={error} className="datepickerContainer">
                <DatePicker
                    key={id}
                    dateFormat='DD/MM/YYYY'
                    onChange={this.handleChangedDate}
                    placeholderText='DD/MM/YYYY'
                    >
                    <label className="control-label" htmlFor={id}>
                        "YOOO"
                    </label>
                </DatePicker>
            </FormField>
        );
    }
});

module.exports = textField;
