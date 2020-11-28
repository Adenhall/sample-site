/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { usersAction } from '../../actions';
import type { Dispatch, ReduxState } from '../../types';
import {
  ChangeLanguage,
  MaterialUI,
  MaterialUITable,
  FunctionComponent,
  AntDesignUI,
  IBMCarbonUI
} from '../../components';
import styles from './styles.scss';

// Export this for unit testing more easily
export class TestFunctions extends PureComponent {
  render() {
    return (
      <div className={styles.base}>
        <Helmet title="TestFunctions" />
        <MaterialUI />
        <MaterialUITable />
        <AntDesignUI />
        <IBMCarbonUI />
        <ChangeLanguage />
        <FunctionComponent />
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ home }: ReduxState) => ({ home });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsersIfNeeded: () => dispatch(usersAction.fetchUsersIfNeeded())
});

export default connect(mapStateToProps, mapDispatchToProps)(TestFunctions);
