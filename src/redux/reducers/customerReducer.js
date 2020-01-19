//import { mixedReducer } from '../_utils/redux-helpers';
import {
  LOAD_CUSTOMERS_DATA,
  LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAIL
} from '../actions/customerActions';

function CustomerReducer(state = { loading: false }, { type, payload }) {
  switch (type) {
    case LOAD_CUSTOMERS_DATA: {
      return {
        ...state,
        load: true
      };
    }

    case LOAD_CUSTOMERS_SUCCESS: {
      console.log(75);
      return {
        ...state,
        customers: payload,
        loading: false
      };
    }

    case LOAD_CUSTOMERS_FAIL: {
      console.log(76);
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
}

export default CustomerReducer;
