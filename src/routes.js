/* @flow */

import { usersAction, userAction } from './actions';
import BasicLayout from './layout/BasicLayout';
import {
  pageHome,
  pageUserInfo,
  NotFound,
  pageTestFunctions,
  pageLogin
} from './pages';

export default [
  {
    component: BasicLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: pageHome, // Add your route here
        loadData: () => [
          usersAction.fetchUsersIfNeeded()
          // Add other pre-fetched actions here
        ]
      },
      {
        path: '/UserInfo/:id',
        component: pageUserInfo,
        loadData: ({ params }) => [userAction.fetchUserIfNeeded(params.id)]
      },
      {
        path: '/test-functions',
        component: pageTestFunctions,
        isAuthen: true
      },
      {
        path: '/login',
        component: pageLogin
      },
      {
        component: NotFound
      }
    ]
  }
];
