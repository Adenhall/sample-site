/* @flow */

import React from 'react';
// import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';

import config from '../../config';
// Import your global styles here
import 'normalize.css/normalize.css'; // eslint-disable-line import/first
import styles from './styles.scss';

function RouteWithSubRoutes(route) {
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

type Props = { routes: Object };

const App = ({ routes }: Props) => (
  <div className={styles.App}>
    <Helmet {...config.app} />
    {/* Child routes won't render without this */}
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </div>
);

export default hot(module)(App);
