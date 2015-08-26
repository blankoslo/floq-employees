var React = require('react');
var Fluxxor = require('fluxxor');

var Constants = require('./../constants.js');
var Record = require ('./../record.js');

var UserHeader = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('UserStore')
    ],

    getStateFromFlux() {
        var userStore = this.getFlux().store('UserStore');
        return {
            loggedInUser: userStore.loggedInUser
        };
    },

    render: function () {
        return <div> {this.state.loggedInUser.name} </div>
    }
});

module.exports = UserHeader;
