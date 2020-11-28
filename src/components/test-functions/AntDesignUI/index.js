/* @flow */

import React, { PureComponent } from 'react';
import { Button, Table } from 'antd';

export default class AntDesignUI extends PureComponent {
  render() {
    const dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street'
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street'
      }
    ];

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      }
    ];
    return (
      <div>
        <hr />
        <h2>ANT Design UI </h2>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
