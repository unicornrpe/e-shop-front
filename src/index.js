import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

const { store, history } = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
