var React = require('react');
var classNames = require('classnames');

var formField = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        error: React.PropTypes.bool
    },

    render: function() {
        var classes = classNames({
            'form-group': true,
            errorMessage: this.props.error
        });
        return (
            <div className={classes}>
                <label className="control-label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                {this.props.children}
            </div>
        );
    }

});

module.exports = formField;