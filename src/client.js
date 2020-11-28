/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { isEmpty } from 'lodash';
import { ConnectedRouter } from 'connected-react-router';
// import { renderRoutes } from 'react-router-config';
import { loadableReady } from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { getToken } from './utils/token';

import configureStore from './config/configureStore';
import routes from './routes';

// Get the initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const { store, history } = configureStore({ initialState });

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function RouteWithSubRoutes(route) {
  console.log('route.path', route.location.pathname);
  const branch = matchRoutes(route.routes, route.location.pathname);

  if (!isEmpty(branch) && branch[0].route.isAuthen) {
    return (
      <Route
        path={route.path}
        render={props => {
          const { token } = getToken();
          console.log('token', token);
          if (!token) {
            return <Redirect to={{ pathname: '/login' }} />;
          }
          return (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
          );
        }}
      />
    );
  }
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const render = Routes => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            {Routes.map((route, i) => {
              return <RouteWithSubRoutes key={i} {...route} />;
            })}
          </Switch>
          {/* {renderRoutes(route)} */}
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    // $FlowFixMe: isn't an issue
    document.getElementById('react-view')
  );
};

// loadable-component setup
loadableReady(() => {
  render(routes);
});

if (module.hot) {
  // Enable webpack hot module replacement for routes
  module.hot.accept('./routes', () => {
    try {
      const nextRoutes = require('./routes').default;

      render(nextRoutes);
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}
