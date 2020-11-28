/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { usersAction } from '../../actions';
import { Dispatch, ReduxState } from '../../types';
import styles from './styles.scss';

// Export this for unit testing more easily
export class Home extends PureComponent {
  onLogout() {
    localStorage.removeItem('token');
  }

  onLogin() {
    localStorage.setItem('token', JSON.stringify({ token: new Date() }));
  }

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        Login page
        <button onClick={() => this.onLogin()} className="btn btn-primary">
          Login
        </button>
        <button onClick={() => this.onLogout()} className="btn btn-primary">
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ login }: ReduxState) => ({ login });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsersIfNeeded: () => dispatch(usersAction.fetchUsersIfNeeded())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
