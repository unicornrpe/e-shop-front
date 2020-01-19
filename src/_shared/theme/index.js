import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { createGenerateClassName } from '@material-ui/core/styles';

import { SheetsRegistry } from 'jss';
//import JssProvider from 'react-jss/lib/JssProvider';
import { JssProvider } from 'react-jss';

const sheetsRegistry = new SheetsRegistry();
let xxxxx = createGenerateClassName({ productionPrefix: '_' });
let generateClassName = (...props) => {
  let data = xxxxx(...props);

  return data;
};
const sheetsManager = new Map();
console.log('NODE_ENV', process.env.NODE_ENV);
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    secondary: {
      light: '#ffed4d',
      main: '#ffbb00',
      dark: '#c78b00',
      contrastText: '#000000'
    },
    primary: {
      light: '#5da8fd',
      main: '#0879c9',
      dark: '#004e98',
      contrastText: '#ffffff'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1900
    }
  }
});

export default class extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    let { children } = this.props;
    return (
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          {children}
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export { sheetsRegistry };
