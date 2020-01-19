import React from 'react';
import { Route } from 'react-router-dom';
//import HeaderBar from './HeaderBar';
import ErrorBoundary from './ErrorBoundary';
//import Footer from './Footer';
import { withStyles, Hidden } from '@material-ui/core';
//import SideBar from './SideBar';
import Grid from '@material-ui/core/Grid';

let styles = theme => ({
  container: {
    minHeight: 'calc(100vh - 220px)',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '5px',
      paddingLeft: '5px'
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '4em !important'
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: '4em !important'
    }
  }
});

let MinimalRoute = ({ classes, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <>
        {/* <SideBar> */}
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
        {/* </SideBar>
                <Footer /> */}
      </>
    )}
  />
);

MinimalRoute = withStyles(styles)(MinimalRoute);

export default MinimalRoute;
