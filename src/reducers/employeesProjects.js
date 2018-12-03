import * as Immutable from "immutable";

import { GET_EMPLOYEES_PROJECTS } from "../actions/index";

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PROJECTS:
      return {
        loading: false,
        data: new Immutable.OrderedMap(
          action.payload.data.map(e => [
            e.id,
            { customer_id: e.customer_id, customer_name: e.customer_name }
          ])
        )
      };
    default:
      return state;
  }
};
