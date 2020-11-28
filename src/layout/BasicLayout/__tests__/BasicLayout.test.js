import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import BasicLayout from '../index';

describe('<BasicLayout />', () => {
  it('renders', () => {
    const fakeStore = {
      default: () => {},
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({ home: () => {} })
    };
    const fakeRoute = {
      routes: [
        {
          path: '/',
          exact: true,
          component: () => (
            <div>
              <h1>This is Home!</h1>
            </div>
          )
        }
      ]
    };

    const tree = renderer
      .create(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <BasicLayout route={fakeRoute} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
