/* @flow */

import React from 'react';

import { Link } from 'react-router-dom';

import styles from './styles.scss';

type Props = { list: Array<Object> };

export default ({ list }: Props) => (
  <div className={styles.UserList}>
    <h4>User List</h4>
    <ul>
      {list.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/UserInfo/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
);
