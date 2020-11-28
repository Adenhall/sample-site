/* @flow */

import axios from 'axios';
import config from '../config';

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

const API_URL = `http://${config.host}:${config.port}/apis/users`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchUsers = (URL: string = API_URL): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'USERS_REQUESTING' });

  try {
    const { data } = await axios.get(URL);

    /* istanbul ignore next */
    dispatch({ type: 'USERS_SUCCESS', data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'USERS_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchUsers = (state: ReduxState): boolean => {
  if (state.home.readyStatus === 'USERS_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchUsersIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchUsers(getState())) return dispatch(fetchUsers());

  /* istanbul ignore next */
  return null;
};
