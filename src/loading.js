import adt from 'adt';

// a `Maybe` type for data that might not habe been loaded yet
export default adt.data({
  loading: null,
  loaded: { value: adt.any }
});
