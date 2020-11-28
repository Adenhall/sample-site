/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

type Props = { info: Object };

export default ({ info }: Props) => (
  <div className={styles.UserCard}>
    <h4>User Card</h4>
    <ul>
      <li>Name: {info.name}</li>
      <li>Phone: {info.phone}</li>
      <li>Email: {info.email}</li>
      <li>Website: {info.website}</li>
    </ul>
    <Link to="/">Home</Link>
  </div>
);
