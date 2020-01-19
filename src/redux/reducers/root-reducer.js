import { connectRouter } from 'connected-react-router';
//import { loadingBarReducer } from 'react-redux-loading-bar';
import { combineReducers } from 'redux';
// import { reducer as reduxFormReducer } from 'redux-form';
import CustomerReducer from './customerReducer';

import { isServer } from '../../environment';

export const RootState = {};

export default history =>
  combineReducers({
    customer: CustomerReducer,
    //form: reduxFormReducer,
    //loadingBar: loadingBarReducer,
    router: connectRouter(history),
    lastAction,
    metaData
  });

function metaData(state = {}, { type, payload }) {
  // switch (type) {
  //   case 'ROOT_CLEAN_METADATA':
  //     return undefined;
  // }
  return state;
}
function lastAction(state = [], action) {
  if (!isServer && state.length > 100) {
    state = state.slice(state.length - 50, state.length);
  }
  return [...state, action.type];
}
