/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../components';

const Login = loadable(() => import('./Login'), {
  fallback: <Loading />
});

export default props => (
  <ErrorBoundary>
    <Login {...props} />
  </ErrorBoundary>
);
