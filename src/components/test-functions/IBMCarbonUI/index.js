/* @flow */
// IMB Carbon components: https://www.carbondesignsystem.com/components/data-table/code/
import React from 'react';
import {
  Button,
  DataTable,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  ProgressStep,
  ProgressIndicator,
  Tooltip
} from 'carbon-components-react';

const headerData = [
  {
    header: 'Name',
    key: 'name'
  },
  {
    header: 'Protocol',
    key: 'protocol'
  },
  {
    header: 'Port',
    key: 'port'
  },
  {
    header: 'Rule',
    key: 'rule'
  },
  {
    header: 'Attached Groups',
    key: 'attached_groups'
  },
  {
    header: 'Status',
    key: 'status'
  }
];

const rowData = [
  {
    attached_groups: 'Kevins VM Groups',
    id: 'a',
    name: 'Load Balancer 3',
    port: 3000,
    protocol: 'HTTP',
    rule: 'Round robin',
    status: 'Disabled'
  },
  {
    attached_groups: 'Maureens VM Groups',
    id: 'b',
    name: 'Load Balancer 1',
    port: 443,
    protocol: 'HTTP',
    rule: 'Round robin',
    status: 'Starting'
  },
  {
    attached_groups: 'Andrews VM Groups',
    id: 'c',
    name: 'Load Balancer 2',
    port: 80,
    protocol: 'HTTP',
    rule: 'DNS delegation',
    status: 'Active'
  },
  {
    attached_groups: 'Marcs VM Groups',
    id: 'd',
    name: 'Load Balancer 6',
    port: 3000,
    protocol: 'HTTP',
    rule: 'Round robin',
    status: 'Disabled'
  },
  {
    attached_groups: 'Mels VM Groups',
    id: 'e',
    name: 'Load Balancer 4',
    port: 443,
    protocol: 'HTTP',
    rule: 'Round robin',
    status: 'Starting'
  },
  {
    attached_groups: 'Ronjas VM Groups',
    id: 'f',
    name: 'Load Balancer 5',
    port: 80,
    protocol: 'HTTP',
    rule: 'DNS delegation',
    status: 'Active'
  }
];

export default () => (
  <div>
    <hr />
    <h2>IBM Carbon UI </h2>
    <Button className="But">Button</Button>
    <DataTable
      isSortable
      rows={rowData}
      headers={headerData}
      render={({ rows, headers, getHeaderProps }) => (
        <TableContainer title="DataTable">
          <Table>
            <TableHead>
              <TableRow>
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />

    <div className="some-container">
      <ProgressIndicator currentIndex={1}>
        <ProgressStep
          label="First step"
          description="Step 1: Getting started with Carbon Design System"
        />
        <ProgressStep
          current
          label="Second step with tooltip"
          description="Step 2: Getting started with Carbon Design System"
          renderLabel={() => (
            <Tooltip
              direction="bottom"
              showIcon={false}
              triggerClassName="bx--progress-label"
              triggerText="Second step with tooltip"
              tooltipId="tooltipId-0"
            >
              <p>Second step with tooltip</p>
            </Tooltip>
          )}
        />
        <ProgressStep
          label="Third step"
          description="Step 3: Getting started with Carbon Design System"
          secondaryLabel="Optional label"
        />
        <ProgressStep
          invalid
          label="Fourth step"
          description="Step 4: Getting started with Carbon Design System"
        />
        <ProgressStep
          disabled
          label="Fifth step"
          description="Step 5: Getting started with Carbon Design System"
        />
      </ProgressIndicator>
    </div>
  </div>
);
