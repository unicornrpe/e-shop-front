import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { withStyles, Hidden } from '@material-ui/core';

let styles = theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 90px)'
      //padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 'calc(100vh - 90px)',
      paddingBottom: '4em !important'
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: 'calc(100vh - 90px)',
      marginTop: 35,
      paddingBottom: '4em !important'
    }
  },
  backgroundImage: {
    backgroundImage: `url(${'static/src/img/main.jpg'})`
  },
  myVideo: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    minWidth: '100%',
    minHeight: '100%'
  },
  content: {
    position: 'fixed',
    bottom: 0,
    color: '#f1f1f1',
    width: '100%',
    padding: '20px'
  }
});

let PublicRoute = ({
  classes,
  style,
  hideFooter,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <>
        <video
          id="background-video"
          className={classes.myVideo}
          src="./assets/video/background-video.mov"
          autoPlay
          video
        />
        <div className={`${classes.content}`}>
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        </div>
      </>
    )}
  />
);

PublicRoute = withStyles(styles)(PublicRoute);

export default PublicRoute;
