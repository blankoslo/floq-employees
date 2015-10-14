var Constants = {
    // Flux actions
    EMPLOYEES_LOAD_STARTED: "EMPLOYEES_LOAD_STARTED",
    EMPLOYEES_LOAD_SUCCEEDED: "EMPLOYEES_LOAD_SUCCEEDED",
    EMPLOYEES_LOAD_FAILED: "EMPLOYEES_LOAD_FAILED",

    EMPLOYEES_CREATE_STARTED: "EMPLOYEES_CREATE_STARTED",
    EMPLOYEES_CREATE_SUCCEEDED: "EMPLOYEES_CREATE_SUCCEEDED",
    EMPLOYEES_CREATE_FAILED: "EMPLOYEES_CREATE_FAILED",

    EMPLOYEES_UPDATE_STARTED: "EMPLOYEES_UPDATE_STARTED",
    EMPLOYEES_UPDATE_SUCCEEDED: "EMPLOYEES_UPDATE_SUCCEEDED",
    EMPLOYEES_UPDATE_FAILED: "EMPLOYEES_UPDATE_FAILED",

    GENDERS_LOAD_STARTED: "GENDERS_LOAD_STARTED",
    GENDERS_LOAD_SUCCEEDED: "GENDERS_LOAD_SUCCEEDED",
    GENDERS_LOAD_FAILED: "GENDERS_LOAD_FAILED",

    USER_SIGNED_IN: "USER_SIGNED_IN",

    // Other stuff
    ATTR_LABELS: {
        firstName: 'Fornavn',
        lastName: 'Etternavn',
        phone: 'Telefon',
        email: 'E-post',
        address: 'Adresse',
        postalCode: 'Postnr.',
        city: 'Sted',
        dateOfEmployment: 'Ansettelsesdato',
        birthDate: 'Fødselsdato',
        gender: 'Kjønn',
        emergencyContactName: 'Kontaktperson',
        emergencyContactPhone: 'Kontaktperson, telefon',
        emergencyContactRelation: 'Kontaktperson, relasjon',

        edit: 'Detaljer'
    }
};

module.exports = Constants;
