export const required = value => (value ? undefined : 'Påkrevd');

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Ugyldig e-post adresse'
    : undefined);

export const phone = value =>
  (value && !/^[0-9]{8,8}$/i.test(value) ? 'Ugylding telefonnummer' : undefined);

export const bankAccount = value =>
  (value && !/^[0-9]{4}.[0-9]{2}.[0-9]{5}$/i.test(value) ? 'Ugydling kontonummer' : undefined);
