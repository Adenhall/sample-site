/* @flow */

import React, { PureComponent } from 'react';
import { Button, IconButton, Tooltip, Fab } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import styles from './styles.scss';

export default class MaterialUI extends PureComponent {
  render() {
    return (
      <div className={styles.loading}>
        <hr />
        <h2>Material UI </h2>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" color="primary" href="#contained-buttons">
          Link
        </Button>
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add" aria-label="add">
          <Fab color="primary">
            <AddIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="Add" aria-label="add">
          <Fab color="secondary">
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    );
  }
}
