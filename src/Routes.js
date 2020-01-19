import { isWidthDown } from '@material-ui/core/withWidth';
import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import MinimalRoute from './_shared/MinimalRoute';
//import IncludeWidth from './pages/_utils/redux-material-ui/include-width';
import ErrorBoundary from './_shared/ErrorBoundary';
//import Login from './login/Login';

let LoadingContainer = () => <div style={{ minHeight: '100vh' }} />;

const PublicRoute = Loadable({
  loader: () =>
    import(/* webpackChunkName: "PublicRoute" */ './_shared/PublicRoute'),
  loading: () => null,
  modules: ['PublicRoute']
});

const CustomerList = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "BlogPage" */ './components/pages/customers/CustomerList'
    ),
  loading: () => <LoadingContainer />,
  modules: ['AllResultView']
});

let Routes = ({ currentStore, width }) => {
  let isMobile = isWidthDown('sm', width);
  return (
    <>
      <ErrorBoundary>
        {currentStore && currentStore.closed && <div>test</div>}
        <Switch>
          <MinimalRoute exact path="/customers" component={CustomerList} />

          <Route exact path="/" component={CustomerList} />
        </Switch>
      </ErrorBoundary>
    </>
  );
};

Routes = connect(state => ({}))(Routes);

Routes = withRouter(Routes);
//Routes = IncludeWidth(Routes);
export default Routes;
