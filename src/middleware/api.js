import { apiError } from '../actions';

const isPromise = val => val && typeof val.then === 'function';

export default store => next => action => (
  isPromise(action.payload)
    ? action.payload.then(
      result => store.dispatch({ ...action, payload: result }),
      error => {
        store.dispatch(apiError({
          status: error.status,
          message: error.data.message
        }));

        return Promise.reject(error);
      }
    )
    : next(action)
);
