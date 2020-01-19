import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../src/_shared/theme';

import AppWrapper from './_shared/AppWrapper';
import Routes from './Routes';

function App() {
  return (
    <>
      <CssBaseline />
      <Theme>
        <AppWrapper>
          <Routes />
        </AppWrapper>
      </Theme>
    </>
  );
}

export default App;
