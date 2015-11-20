// fluxxor depends on lodash, which expects the global var to be set,
// which webpack doesn't seem to do by default.
// https://github.com/lodash/lodash/issues/915
// Workaround until I figure out how to expose global in webpack:
window.global = window;


var React = require('react');
import { Router, Route, Link, IndexRoute } from 'react-router'

var Fluxxor = require('fluxxor');
var _ = require('underscore');
var Constants = require('./constants.js');
var Immutable = require('immutable');
var EmployeeStore = require('./stores/EmployeeStore.js');
var GenderStore = require('./stores/GenderStore.js');
var actions = require('./actions.js');
require('../style/datepicker.less');

var stores = {
    EmployeeStore: new EmployeeStore(),
    GenderStore: new GenderStore()
};

var flux = new Fluxxor.Flux(stores, actions);
var FluxMixin = Fluxxor.FluxMixin(React);

var EmployeeList = require('./components/employeeList.jsx');
var ViewEmployee = require('./components/viewEmployee.jsx');
var EditEmployee = require('./components/editEmployee.jsx');
var CreateEmployee = require('./components/createEmployee.jsx');

var AppWrapper = React.createClass({
    mixins: [FluxMixin],

    componentWillMount() {
        this.getFlux().actions.loadGenders();
        this.getFlux().actions.loadEmployees();
    },

    render() {
        return (
            <div>
                <Link to={`/employees/new`} className='appbutton bgred'>Legg til ansatt</Link>
                {this.props.children}
            </div>
        );
    }
});

const createFluxComponent = (Component, props) => {
    return <Component {...props} flux={flux} />;
};

import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory();
React.render(
    <Router history={history} createElement={createFluxComponent}>
        <Route path="/" component={AppWrapper}>
            <IndexRoute component={EmployeeList}/>
            <Route path="employees" component={EmployeeList}>
                <Route path="/employee/:id" component={ViewEmployee} />
                <Route path="/employee/:id/edit" component={EditEmployee} />
                <Route path="/employees/new" component={CreateEmployee} />
            </Route>
        </Route>
    </Router>,
document.getElementById('app'));

window.global.triggerGoogleLoaded = function() {
    window.dispatchEvent(new Event('google-loaded'));
};
