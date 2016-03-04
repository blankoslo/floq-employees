var React = require('react');
var classNames = require('classnames');

var formField = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        error: React.PropTypes.bool
    },

    render() {
        var classes = classNames({
            'form-group': true,
            errorMessage: this.props.error
        }, this.props.className);
        return (
            <div className={classes}>
                <label className={this.props.labelClassName} htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                {this.props.children}
            </div>
        );
    }
});

module.exports = formField;
