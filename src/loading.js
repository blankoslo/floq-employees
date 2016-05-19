// a `Maybe` type for data that might not habe been loaded yet

// constructor functions:

export const loading = {
  state: 'loading',
  value: null
};

export const loaded = (data) => ({
  state: 'loaded',
  value: data
});

// status checks

export const isLoading = ({ state }) => state === 'loading';
export const isLoaded = ({ state }) => state === 'loaded';

// get its value

export const getValue = ({ state, value }) => {
  if (state !== 'loaded') {
    throw new Error('attempted to get a `loading` value');
  }

  return value;
};
