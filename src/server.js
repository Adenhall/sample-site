/* @flow */

import path from 'path';
import logger from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Switch, Route } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import Helmet from 'react-helmet';
import chalk from 'chalk';
import openBrowser from 'react-dev-utils/openBrowser';
import { isEmpty } from 'lodash';

import configureStore from './config/configureStore';
import renderHtml from './config/renderHtml';
import routes from './routes';
import config from './config';
import apis from './services/apis';
// Init multi languages
import './i18n';

function RouteWithSubRoutes(route) {
  console.log('route.path', route.location.pathname);
  const branch = matchRoutes(route.routes, route.location.pathname);

  if (!isEmpty(branch) && branch[0].route.isAuthen) {
    return (
      <Route
        path={route.path}
        render={() => {
          return <div />;
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

const app = express();

// Use helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution
app.use(hpp());
// Compress all requests
app.use(compression());
// Use express routers:
app.use('/apis', apis);

// Use for http request debug (show errors only)
app.use(logger('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));
app.use(
  '/static',
  express.static(path.resolve(process.cwd(), 'public/static'))
);

if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')));
} else {
  /* Run express as webpack dev server */

  const webpack = require('webpack');
  const webpackConfig = require('../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      writeToDisk: true,
      stats: 'minimal',
      serverSideRender: true
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false // Turn it off for friendly-errors-webpack-plugin
    })
  );
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  const { store } = configureStore({ url: req.url });

  // The method for loading data from server-side
  const loadBranchData = (): Promise<any> => {
    const branch = matchRoutes(routes, req.path);

    const promises = branch.map(({ route, match }) => {
      if (route.loadData) {
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map(item => store.dispatch(item))
        );
      }

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  };

  (async () => {
    try {
      // Load data from server-side first
      await loadBranchData();

      const statsFile = path.resolve(
        process.cwd(),
        'public/loadable-stats.json'
      );
      const extractor = new ChunkExtractor({ statsFile });

      const staticContext = {};
      const AppComponent = (
        <ChunkExtractorManager extractor={extractor}>
          <Provider store={store}>
            {/* Setup React-Router server-side rendering */}
            <StaticRouter
              location={req.path}
              context={staticContext}
              // i18n={i18n}
            >
              {/* {renderRoutes(routes)} */}
              <Switch>
                {routes.map((route, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </StaticRouter>
          </Provider>
        </ChunkExtractorManager>
      );

      const initialState = store.getState();
      const htmlContent = renderToString(AppComponent);
      // head must be placed after "renderToString"
      // see: https://github.com/nfl/react-helmet#server-usage
      const head = Helmet.renderStatic();

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (staticContext.url) {
        res.status(301).setHeader('Location', staticContext.url);
        res.end();

        return;
      }

      // Check page status
      const status = staticContext.status === '404' ? 404 : 200;

      // Pass the route and initial state into html template
      res
        .status(status)
        .send(renderHtml(head, extractor, htmlContent, initialState));
    } catch (err) {
      res.status(404).send('Not Found :(');

      console.error(chalk.red(`==> 😭  Rendering routes error: ${err}`));
    }
  })();
});

if (config.port) {
  app.listen(config.port, config.host, err => {
    const url = `http://${config.host}:${config.port}`;

    if (err) console.error(chalk.red(`==> 😭  OMG!!! ${err}`));

    console.info(chalk.green(`==> 🌎  Listening at ${url}`));

    // Open browser
    if (openBrowser(url))
      console.info(chalk.green("==> 🖥️  Opened on your browser's tab!"));
  });
} else {
  console.error(
    chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified')
  );
}
