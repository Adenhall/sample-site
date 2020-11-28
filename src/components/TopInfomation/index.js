/* @flow */

import React from 'react';
import config from '../../config';
// Import your global styles here
import styles from './styles.scss';

export default () => (
  <div>
    {/* Header area */}
    <div className={styles.header}>
      <img src={require('./assets/logo.svg')} alt="Logo" role="presentation" />
      <h1>{config.app.title}</h1>
    </div>
    <hr />
  </div>
);
