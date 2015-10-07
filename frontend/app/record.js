var Immutable = require('immutable');

var Record = {
    LoadState: Immutable.Record({loaded: false, loading: false, dirty: false, error: null}),
    CreateState: Immutable.Record({created: true, creating: false, dirty: false, error: null}),
    User: Immutable.Record({name: "", pictureUrl: "", token: "", email:""}),
    Employee: Immutable.Record({id: null, firstName: null, lastName: null, phone: null, email: null, gender: null, birthDate: null,
        dateOfEmployment: null, terminationDate: null, emergencyContactName: null, emergencyContactPhone: null,
        emergencyContactRelation: null, address: null, postalCode: null, city: null}),
    Error: Immutable.Record({type: null, description: null, resourceId: null}),
    Gender: Immutable.Record({name: null, value: null})
};

module.exports = Record;
