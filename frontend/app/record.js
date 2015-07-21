var Immutable = require('immutable');

var Record = {
    LoadState: Immutable.Record({loaded: false, loading: false, dirty: false, error: null}),
    Employee: Immutable.Record({firstName: null, lastName: null, phone: null, gender: null, birthDate: null,
        dateOfEmployment: null, terminationDate: null, emergencyContactName: null, emergencyContactPhone: null,
        address: null, postalCode: null, city: null}),
    Error: Immutable.Record({type: null, description: null, resourceId: null})
};

module.exports = Record;
