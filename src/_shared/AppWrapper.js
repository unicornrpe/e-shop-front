import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { isServer } from '../environment';

export default class AppWrapper extends Component {
  render() {
    let { children } = this.props;
    return (
      <>
        <div className="landscape">{children}</div>
        {/* {!isServer && (
          <div className="landscapeWorning">
            <div className="landscapeWorningContent">
              <Typography style={{ color: 'white' }} variant="h6">
                Please rotate your device{' '}
              </Typography>

              <Typography variant="body2" style={{ color: 'white' }}>
                We don't support landscape mode yet. Please go back to portrait
                mode for the best experience
              </Typography>
            </div>
          </div>
        )} */}
      </>
    );
  }
}
