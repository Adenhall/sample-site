/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../components';

const TestFunctions = loadable(() => import('./TestFunctions'), {
  fallback: <Loading />
});

export default props => (
  <ErrorBoundary>
    <TestFunctions {...props} />
  </ErrorBoundary>
);
