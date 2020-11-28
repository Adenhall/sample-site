/* @flow */

import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';
import i18next from '../../../i18n';

export default class ChangeLanguage extends PureComponent {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    // Set the state directly. Use props if necessary.
    this.state = {};
  }

  onChangeLanguge(language = 'en') {
    i18next.changeLanguage(language);
    this.setState({ language });
  }

  render() {
    const { language } = this.state;

    return (
      <div>
        <p>Language: {language}</p>
        <p>- hello: {i18next.t('hello')}</p>
        <p>- city: {i18next.t('city')}</p>
        <Button
          onClick={() => this.onChangeLanguge('en')}
          variant="contained"
          color="primary"
        >
          EN
        </Button>
        <Button
          onClick={() => this.onChangeLanguge('vi')}
          variant="contained"
          color="secondary"
        >
          VI
        </Button>
      </div>
    );
  }
}
