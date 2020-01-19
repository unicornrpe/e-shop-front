import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../redux/reducers/root-reducer';
import rootSaga from '../redux/sagas/root-saga';
import { isServer } from './../environment';

const { sagaMiddleware, activeEffectIds } = initializeSagaMiddleware();

export default req => {
  const history = (isServer && createMemoryHistory()) || createBrowserHistory();

  const middlewares = [sagaMiddleware];

  const composeEnhancer =
    (!isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  // Do we have preloaded state available? Great, save it.
  let initialState = (!isServer && window.__PRELOADED_STATE__) || {};

  if (!initialState.metaData) {
    initialState = {
      ...initialState,
      metaData: {
        hostUrl: getHostUrl(req),
        cookies: (isServer && getCookies(req)) || undefined
      }
    };
  }

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares, routerMiddleware(history)))
  );

  // Delete it once we have it stored in a variable
  if (!isServer) delete window.__PRELOADED_STATE__;

  sagaMiddleware.run(rootSaga);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  store.activeEffectIds = activeEffectIds;

  return {
    store,
    history
  };
};

function initializeSagaMiddleware() {
  // For Server side rendering
  const activeEffectIds = [];
  const watchEffectEnd = effectId => {
    const effectIndex = activeEffectIds.indexOf(effectId);

    if (effectIndex !== -1) {
      activeEffectIds.splice(effectIndex, 1);
    }
  };
  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: {
      effectCancelled: watchEffectEnd,
      effectRejected: watchEffectEnd,
      effectResolved: watchEffectEnd,
      effectTriggered: event => {
        if (event.effect.CALL) {
          activeEffectIds.push(event.effectId);
        }
      }
    }
  });
  return {
    sagaMiddleware,
    activeEffectIds
  };
}

function getHostUrl(request) {
  if (!isServer) {
    return window.location.protocol + '//' + window.location.host + '/';
  }
  let hostName = request.headers.host;
  return `http${(request.secure && 's') || ''}://${hostName}/`;
}

function getCookies(request) {
  return request.headers.cookie;
}
